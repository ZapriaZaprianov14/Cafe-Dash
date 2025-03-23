package com.cafe.backend.service.impl;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import com.cafe.backend.dto.*;
import com.cafe.backend.entity.mapper.*;
import com.cafe.backend.entity.review.ReviewEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.entity.order.OrderEntity;
import com.cafe.backend.entity.role.RoleEntity;
import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.DataMappingException;
import com.cafe.backend.exception.NotFoundException;
import com.cafe.backend.exception.ResourceNotFoundException;
import com.cafe.backend.repository.RoleRepository;
import com.cafe.backend.repository.UserRepository;
import com.cafe.backend.service.UserService;

import jakarta.transaction.Transactional;

/**
 * {@code UserServiceImpl} is class that implements {@link UserService}.
 * It uses {@code userRepository} to save/find the necessary data by the
 * provided methods by {@code JpaRepository} which {@link UserRepository}
 * extends.
 *
 * @author VasilStoykov
 */

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired 
    private RoleRepository roleRepository;

    @Override
    public UserDTO createUser(UserDTO userDTO) throws BadRequestException {
        UserEntity user = UserMapper.mapToEntity(userDTO);
        user.setId(null);
        user.setRoles(null);
        user.setOrders(null);
        user.setReviews(null);
        user.setDeleted(false);
        UserEntity savedUser = userRepository.save(user);
        return UserMapper.mapToDTO(savedUser);
    }

    @Override
    public JWTUserDTO registerUser(RegisterUserDTO registerUserDTO) throws BadRequestException, ResourceNotFoundException {

    	Set<RoleEntity> roleEntities = new HashSet<>();
    	if(registerUserDTO.roleNames() != null) {
    		for(String roleName : registerUserDTO.roleNames()) {
        		RoleEntity roleEntity = roleRepository.findByRoleNameAndIsDeletedFalse(roleName)
                        .orElseThrow(() -> new ResourceNotFoundException("Role not found with name : " + roleName));
        		roleEntities.add(roleEntity);
        	}
    	}
    	
        UserEntity user = RegisterUserMapper.mapToEntity(registerUserDTO);
        user.setRoles(roleEntities);
        user.setId(null);
        user.setOrders(null);
        UserEntity savedUser = userRepository.save(user);
        return JWTUserMapper.mapToDTO(savedUser);
    }

    @Override
    public UserDTO updateUser(Long id, UserDTO userDTO) throws BadRequestException, NotFoundException {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Could not find user with this id:" + id));
        UserEntity updatedUser = updateUserFields(userDTO, user);
        return UserMapper.mapToDTO(updatedUser);
    }
    
    @Override
    public boolean doesUserExist(String username) {
    	Optional<UserEntity> userOptional = userRepository.findByUsernameAndIsDeletedFalse(username);
    	if (userOptional.isEmpty()) {
    		return false;
    	}
    	return true;
    }

    @Override
    public UserDTO getUserById(Long id) throws BadRequestException, NotFoundException {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Could not find user with this id:" + id));
        return UserMapper.mapToDTO(user);
    }

    private UserEntity updateUserFields(UserDTO newUserDTO, UserEntity user) throws DataMappingException {

        if (newUserDTO.username() != null) {
            user.setUsername(newUserDTO.username());
        }

        if (newUserDTO.role() != null) {
            Set<RoleEntity> roleEntities = getRoleEntities(newUserDTO);
            user.setRoles(roleEntities);
        }

        if (newUserDTO.orders() != null) {
            Set<OrderEntity> orderEntities = getOrderEntities(newUserDTO);
            user.setOrders(orderEntities);
        }

        if (newUserDTO.reviews() != null) {
            Set<ReviewEntity> reviewEntities = getReviewsEntities(newUserDTO);
            user.setReviews(reviewEntities);
        }

        return userRepository.save(user);
    }

    private Set<RoleEntity> getRoleEntities(UserDTO userDTO) throws DataMappingException {
        Set<RoleEntity> roleEntities = new HashSet<>();
        for (RoleDTO role : userDTO.role()) {
            roleEntities.add(RoleMapper.mapToEntity(role));
        }
        return roleEntities;
    }

    private Set<OrderEntity> getOrderEntities(UserDTO newUserDTO) throws DataMappingException {
        Set<OrderEntity> orderEntities = new HashSet<>();
        for (OrderDTO order : newUserDTO.orders()) {
            orderEntities.add(OrderMapper.mapToEntity(order));
        }
        return orderEntities;
    }

    private Set<ReviewEntity> getReviewsEntities(UserDTO newUserDTO) throws DataMappingException {
        Set<ReviewEntity> reviewEntities = new HashSet<>();
        for (ReviewDTO reviewDTO : newUserDTO.reviews()) {
            reviewEntities.add(ReviewMapper.mapToEntity(reviewDTO));
        }
        return reviewEntities;
    }
}

package com.cafe.backend.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cafe.backend.dto.JWTUserDTO;
import com.cafe.backend.dto.RegisterUserDTO;
import com.cafe.backend.dto.UpdateUserDTO;
import com.cafe.backend.dto.UserDTO;
import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.entity.mapper.JWTUserMapper;
import com.cafe.backend.entity.mapper.RegisterUserMapper;
import com.cafe.backend.entity.mapper.UserMapper;
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

    // used by admin and owner
    @Override
    public UserDTO createUser(RegisterUserDTO registerUserDTO) throws BadRequestException, NotFoundException {
        UserEntity user = createAndSaveUser(registerUserDTO);
        return UserMapper.mapToDTO(user);
    }
    // used by Customers
    @Override
    public JWTUserDTO registerUser(RegisterUserDTO registerUserDTO) throws BadRequestException, ResourceNotFoundException {
        UserEntity savedUser = createAndSaveUser(registerUserDTO);
        return JWTUserMapper.mapToDTO(savedUser);
    }

    @Override
    public UserDTO updateUser(Long id, UpdateUserDTO userDTO) throws BadRequestException, NotFoundException {
        UserEntity user = userRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Could not find user with this id:" + id));
        UserEntity updatedUser = updateUserFields(userDTO, user);
        return UserMapper.mapToDTO(updatedUser);
    }

    @Override
    public boolean doesUserExist(String username) {
    	Optional<UserEntity> userOptional = userRepository.findByUsernameAndIsDeletedFalse(username);
        return userOptional.isPresent();
    }

    @Override
    public UserDTO getUserById(Long id) throws BadRequestException, NotFoundException {
        UserEntity user = userRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Could not find user with this id:" + id));
        return UserMapper.mapToDTO(user);
    }
    
    @Override
    public UserEntity getUserByEmail(String email) throws BadRequestException, NotFoundException {
       Optional<UserEntity> user = userRepository.findByEmailAndIsDeletedFalse(email);
        if(user.isEmpty()) {
        	return null;
        }
        return user.get();
    }
    
    @Override
    public List<UserDTO> getAllUsers() throws BadRequestException, NotFoundException{
    	List<UserEntity> userEntities = userRepository.findAllByIsDeletedFalse();
    	if(userEntities.isEmpty()) {
    		throw new ResourceNotFoundException("No users found");
    	}
    	List<UserDTO> userDTOs = new ArrayList<>();
    	for(UserEntity entity : userEntities) {
    		userDTOs.add(UserMapper.mapToDTO(entity));
    	}
    	return userDTOs;
    }

    private UserEntity createAndSaveUser(RegisterUserDTO registerUserDTO) throws ResourceNotFoundException, BadRequestException {
        List<RoleEntity> roleEntities = new ArrayList<>();
        if (registerUserDTO.roleNames() != null) {
            for (String roleName : registerUserDTO.roleNames()) {
                RoleEntity roleEntity = roleRepository.findByRoleNameAndIsDeletedFalse(roleName)
                        .orElseThrow(() -> new ResourceNotFoundException("Role not found with name : " + roleName));
                roleEntities.add(roleEntity);
            }
        }
        UserEntity user = RegisterUserMapper.mapToEntity(registerUserDTO);
        user.setRoles(roleEntities);
        user.setDeleted(false);
        user.setOrders(null);
        user = userRepository.save(user);
        return user;
    }

    private UserEntity updateUserFields(UpdateUserDTO newUserDTO, UserEntity user) throws DataMappingException {

        if (newUserDTO.username() != null) {
            user.setUsername(newUserDTO.username());
        }

        if (newUserDTO.email() != null) {
            user.setEmail(newUserDTO.email());
        }

        if (newUserDTO.roles() != null) {
            List<RoleEntity> roleEntities = getRoleEntities(newUserDTO);
            user.setRoles(roleEntities);
        }

        return userRepository.save(user);
    }

    private List<RoleEntity> getRoleEntities(UpdateUserDTO userDTO) throws DataMappingException {
        List<RoleEntity> roleEntities = new ArrayList<>();
        for (String roleName : userDTO.roles()) {
        	RoleEntity roleEntity = roleRepository.findByRoleNameAndIsDeletedFalse(roleName).get();
        	roleEntities.add(roleEntity);
        }
        return roleEntities;
    }
}

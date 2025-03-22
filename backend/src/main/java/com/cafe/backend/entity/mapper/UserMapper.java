package com.cafe.backend.entity.mapper;

import java.util.HashSet;
import java.util.Set;

import com.cafe.backend.dto.OrderDTO;
import com.cafe.backend.dto.ReviewDTO;
import com.cafe.backend.dto.RoleDTO;
import com.cafe.backend.dto.UserDTO;
import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.entity.order.OrderEntity;
import com.cafe.backend.entity.review.ReviewEntity;
import com.cafe.backend.entity.role.RoleEntity;
import com.cafe.backend.exception.DataMappingException;

public class UserMapper {

    public static UserDTO mapToDTO(UserEntity userEntity) throws DataMappingException {
        if (userEntity == null) {
            throw new DataMappingException("UserEntity cannot be null.");
        }

        Set<RoleDTO> roleDTOS = new HashSet<>();
        if (userEntity.getRoles() != null) {
            for (RoleEntity role : userEntity.getRoles()) {
                roleDTOS.add(RoleMapper.mapToDTO(role));
            }
        }

        Set<OrderDTO> orderDTOS = new HashSet<>();
        if (userEntity.getOrders() != null) {
            for (OrderEntity order : userEntity.getOrders()) {
                orderDTOS.add(OrderMapper.mapToDTO(order));
            }
        }

        Set<ReviewDTO> reviewDTOS = new HashSet<>();
        if (userEntity.getReviews() != null) {
            for (ReviewEntity review : userEntity.getReviews()) {
                reviewDTOS.add(ReviewMapper.mapToDTO(review));
            }
        }

        return new UserDTO(
                userEntity.getId(),
                userEntity.getUsername(),
                userEntity.getEmail(),
                roleDTOS,
                orderDTOS,
                reviewDTOS
        );
    }

    public static UserEntity mapToEntity(UserDTO userDTO) throws DataMappingException {
        if (userDTO == null) {
            throw new DataMappingException("UserDTO cannot be null.");
        }

        Set<RoleEntity> roleEntities = new HashSet<>();
        for (RoleDTO role : userDTO.role()) {
            roleEntities.add(RoleMapper.mapToEntity(role));
        }

        Set<OrderEntity> orderEntities = new HashSet<>();
        for (OrderDTO order : userDTO.orders()) {
            orderEntities.add(OrderMapper.mapToEntity(order));
        }

        // Up for discussion
        Set<ReviewEntity> reviewEntities = new HashSet<>();
        for (ReviewDTO review : userDTO.reviews()) {
            reviewEntities.add(ReviewMapper.mapToEntity(review));
        }

        return UserEntity.builder()
                .id(userDTO.id())
                .username(userDTO.username())
                .roles(roleEntities)
                .orders(orderEntities)
                .reviews(reviewEntities)
                .build();
    }
}

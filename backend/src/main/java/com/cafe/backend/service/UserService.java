package com.cafe.backend.service;

import java.util.List;

import com.cafe.backend.dto.JWTUserDTO;
import com.cafe.backend.dto.RegisterUserDTO;
import com.cafe.backend.dto.UpdateUserDTO;
import com.cafe.backend.dto.UserDTO;
import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.NotFoundException;

/**
 * {@code UserService} is an interface that defines basic CRUD methods.
 * 
 * @author VasilStoykov
 */

public interface UserService {
    UserDTO createUser(RegisterUserDTO registerUserDTO) throws BadRequestException,NotFoundException;
	JWTUserDTO registerUser(RegisterUserDTO registerUserDTO) throws BadRequestException, NotFoundException;
	UserDTO updateUser(Long id, UpdateUserDTO userDTO) throws BadRequestException, NotFoundException;
	UserDTO getUserById(Long id) throws BadRequestException, NotFoundException;
	UserEntity getUserByEmail(String email) throws BadRequestException, NotFoundException;
	List<UserDTO> getAllUsers() throws BadRequestException, NotFoundException;
	boolean doesUserExist(String username);
}

package com.cafe.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.cafe.backend.dto.JWTUserDTO;
import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.entity.mapper.JWTUserMapper;
import com.cafe.backend.exception.DataMappingException;
import com.cafe.backend.repository.UserRepository;
import com.cafe.backend.security.CustomUserDetails;

@Service
public class CustomUserDetailsServiceImpl implements UserDetailsService {
	
	@Autowired UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserEntity user = userRepository.findByUsernameAndIsDeletedFalse(username)
                .orElseThrow(() -> new UsernameNotFoundException("Incorrect username or password"));
        JWTUserDTO jwtUserDTO = null;
		try {
			jwtUserDTO = JWTUserMapper.mapToDTO(user);
		} catch (DataMappingException e) {
			e.printStackTrace();
		}
        return new CustomUserDetails(jwtUserDTO);
	}
}

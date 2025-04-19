package com.cafe.backend.repository;

import com.cafe.backend.entity.account.UserEntity;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author ZapryanZapryanov
 */

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
	Optional<UserEntity> findByIdAndIsDeletedFalse(Long id);
	
	Optional<UserEntity> findByUsernameAndIsDeletedFalse(String username);
	
	Optional<UserEntity> findByEmailAndIsDeletedFalse(String email);
	
	List<UserEntity> findAllByIsDeletedFalse();
}

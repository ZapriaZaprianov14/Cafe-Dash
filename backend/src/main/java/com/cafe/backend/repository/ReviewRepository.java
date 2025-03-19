package com.cafe.backend.repository;

import com.cafe.backend.entity.review.ReviewEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<ReviewEntity, Long> {}

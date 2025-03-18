package com.cafe.backend.entity.cafeteria;

import java.time.LocalTime;
import java.util.Set;

import com.cafe.backend.entity.order_product.OrderProductEntity;
import com.cafe.backend.entity.product.ProductEntity;

import jakarta.persistence.*;
import lombok.*;

/**
 * {@code Cafeteria} is an abstract entity class.
 * 
 * @author AngelStoynov
 */

@Entity
@Table(name = "cafeteria")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class CafeteriaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    @Column(name = "id")
    private Long id;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "brand", length = 100, nullable = false)
    private String brand;

    @Column(name = "location", length = 100, nullable = false)
    private String location;

    @Column(name = "rating")
    private double rating;

    @Column(name = "count_reviews")
    private int countReview;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(name = "opening_hour")
    private LocalTime openingHour;

    @Column(name = "closing_hour")
    private LocalTime closingHour;

    @OneToMany(mappedBy = "cafeteria", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<ProductEntity> products;

    @Column(name = "is_deleted")
    private boolean isDeleted;
}
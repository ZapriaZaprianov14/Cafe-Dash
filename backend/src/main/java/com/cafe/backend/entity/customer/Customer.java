package com.cafe.backend.entity.customer;

import com.cafe.backend.entity.account.UserAccount;
import com.cafe.backend.entity.order.Order;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

/**
 * {@code Customer} is an entity class. Extends {@link UserAccount}.
 * @author AngelStoynov
 */

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Builder
@Table(name = "customer")
@NoArgsConstructor
@AllArgsConstructor

public abstract class Customer extends UserAccount{

    @Column(name = "balance")
    private double balance;

    @Column(name = "location", length = 100, nullable = false)
    private String location;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Order> orders;
}

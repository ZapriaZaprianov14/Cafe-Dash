package com.cafe.backend.dto;

import java.util.Set;

/**
 * @author AngelStoynov
 */
public record UserAccountDTO(
        Long id,
        String username,
        String email,
        Set<RoleDTO> role,
        Set<OrderDTO> orders
) {}

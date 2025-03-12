package com.cafe.backend.dto;

import com.cafe.backend.enums.ProductTypeEnum;

/**
 * @author AngelStoynov
 */
public record ProductDTO(
        Long id,
        String name,
        double price,
        int quantity,
        ProductTypeEnum productType,
        Long cafeteriaId
) { }

package com.user_management.controller;

import com.user_management.model.Product;
import com.user_management.model.ProductCategory;
import com.user_management.repository.ProductCategoryRepository;
import com.user_management.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class ProductCategoryController {

    @Autowired
    ProductCategoryRepository productCategoryRepository;

    @Autowired
    ProductRepository productRepository;

    @GetMapping("/products/categories")
    public List<ProductCategory> getAllCategories() {
        return productCategoryRepository.findAll();
    }

    @GetMapping("/products/category/{categoryId}")
    public List<Product> getProductByCategoryId(@PathVariable Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

}

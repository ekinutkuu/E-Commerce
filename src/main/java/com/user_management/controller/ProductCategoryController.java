package com.user_management.controller;

import com.user_management.exception.ResourceNotFoundException;
import com.user_management.model.Product;
import com.user_management.model.ProductCategory;
import com.user_management.repository.ProductCategoryRepository;
import com.user_management.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/products/category/categoryid/{id}")
    public ResponseEntity<ProductCategory> getCategoryById(@PathVariable Long id) {
        ProductCategory category = productCategoryRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Category not exist with id: " + id));
        return ResponseEntity.ok(category);
    }

    @PostMapping("/products/category/create")
    public ProductCategory createCategory(@RequestBody ProductCategory category) {
        return productCategoryRepository.save(category);
    }

    @PutMapping("/products/category/update/{id}")
    public ResponseEntity<ProductCategory> updateCategory(@PathVariable Long id, @RequestBody ProductCategory categoryDetails) {
        ProductCategory category = productCategoryRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Category not exist with id: " + id));

        category.setCategoryName(categoryDetails.getCategoryName());

        ProductCategory updatedCategory = productCategoryRepository.save(category);
        return ResponseEntity.ok(updatedCategory);
    }

}

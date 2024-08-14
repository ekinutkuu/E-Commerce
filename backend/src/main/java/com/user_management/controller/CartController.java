package com.user_management.controller;

import com.user_management.exception.ResourceNotFoundException;
import com.user_management.model.Cart;
import com.user_management.model.CartItem;
import com.user_management.model.Product;
import com.user_management.model.User;
import com.user_management.repository.CartItemRepository;
import com.user_management.repository.CartRepository;
import com.user_management.repository.ProductRepository;
import com.user_management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @PostMapping("/carts/{userId}/add")
    public ResponseEntity<?> addToCart(@PathVariable Long userId, @RequestBody CartItem cartItemRequest) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not exist with email: " +userId));

        Product product = productRepository.findById(cartItemRequest.getProduct().getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not exist with id: " + cartItemRequest.getProduct().getProductId()));

        Cart cart = cartRepository.findByUser_UserId(userId)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepository.save(newCart);
                });

        CartItem cartItem = new CartItem();
        cartItem.setCart(cart);
        cartItem.setProduct(product);
        cartItem.setQuantity(cartItemRequest.getQuantity());

        cart.getCartItems().add(cartItem);
        cartRepository.save(cart);

        return ResponseEntity.ok(cart);
    }

    @GetMapping("/carts/{userId}")
    public ResponseEntity<?> getCartItems(@PathVariable Long userId) {

        Cart cart = cartRepository.findByUser_UserId(userId)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(userRepository.findById(userId)
                            .orElseThrow(() -> new ResourceNotFoundException("User not exist with id: " + userId)));
                    return cartRepository.save(newCart);
                });

        return ResponseEntity.ok(cart.getCartItems());
    }

    @DeleteMapping("/carts/{userId}/remove/{productId}")
    public ResponseEntity<?> removeProductFromCart(@PathVariable Long userId, @PathVariable Long productId) {
        Cart cart = cartRepository.findByUser_UserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not exist for user id: " + userId));

        CartItem cartItem = cart.getCartItems().stream()
                .filter(item -> item.getProduct().getProductId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Product not found in cart with id: " + productId));

        cart.getCartItems().remove(cartItem);
        cartItemRepository.delete(cartItem);

        cartRepository.save(cart);
        return ResponseEntity.ok(cart);
    }

}

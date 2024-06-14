package com.user_management.repository;

import com.user_management.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmailId(String emailId);
    Optional<User> findOptionalByEmailId(String emailId);


}

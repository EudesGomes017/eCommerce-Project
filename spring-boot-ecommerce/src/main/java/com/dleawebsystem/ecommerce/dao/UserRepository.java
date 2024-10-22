package com.dleawebsystem.ecommerce.dao;

import com.dleawebsystem.ecommerce.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.UUID;

public interface UserRepository extends JpaRepository<Users, Integer> {

    UserDetails findByEmail(String login);

    boolean existsById(Long id);

    boolean existsByEmail(String email);



}

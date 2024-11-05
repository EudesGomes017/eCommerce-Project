package com.dleawebsystem.ecommerce.service;

import com.dleawebsystem.ecommerce.dao.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        if (email.isEmpty()) {
            throw new UsernameNotFoundException("User not found");
        }
        return userRepository.findByEmail(email);
    }
}

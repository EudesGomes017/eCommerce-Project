package com.dleawebsystem.ecommerce.config;

import com.dleawebsystem.ecommerce.dao.UserRepository;
import com.dleawebsystem.ecommerce.entity.UserTypeEnum;
import com.dleawebsystem.ecommerce.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
/*
//@Component
public class DataLoader implements CommandLineRunner {

 /*   @Autowired
    private final UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder = null;


    public DataLoader(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {

        String email = "eudes@gmail.com";
        String password = passwordEncoder.encode("1234567");
        UserTypeEnum userType = UserTypeEnum.ADMIN;


        // Verificar se o usuário já existe
        List<Users> existingUsers = (List<Users>) userRepository.findByEmail(email);

        if (existingUsers == null) {
            Users user = new Users();
            user.setEmail("eudes@gmail.com");
            user.setPassword(passwordEncoder.encode("1234567"));
            user.setUserType(UserTypeEnum.ADMIN);

            userRepository.save(user);
            System.out.println("Usuário criado: " + email);
        } else {
            // Usuário já existe
            System.out.println("Usuário já existe: " + email);
        }


    }

}
*/
package com.dleawebsystem.ecommerce.entity;

import com.dleawebsystem.ecommerce.dto.RegisterDTO;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Table(name = "Login")
@Entity()
@Data
public class Users implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private Integer id;

    @Column(name = "Name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "user_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private UserTypeEnum userType;

    public Users() {
    }

    public Users(String email, String encryptedPassword, UserTypeEnum userType, String name) {
        this.email = email;
        this.password = encryptedPassword;
        this.userType = userType;
        this.name = name;
    }

    public Users registerUsersForUnauthenticatedUser(RegisterDTO registerDTO) {
        Users newUsers = new Users();
        newUsers.email = registerDTO.email();
        newUsers.password = registerDTO.password();
        newUsers.userType = registerDTO.userTypeEnum();
        newUsers.name = registerDTO.name();
        return newUsers;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Verifica se o usuário é do tipo ADMIN
        if (this.userType == UserTypeEnum.ADMIN) {
            return List.of(
                    new SimpleGrantedAuthority("ROLE_ADMIN"),
                    new SimpleGrantedAuthority("ROLE_USER") // Admin também pode ter acesso como USER
            );
        }
        // Caso contrário, atribui apenas ROLE_USER
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

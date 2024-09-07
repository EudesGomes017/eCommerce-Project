package com.dleawebsystem.ecommerce.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "customer")
@Getter
@Setter
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "fistName")
    private String fistName;

    @Column(name = "lastName")
    private String lastName;

    @Column(name = "email")
    private String email;

    @OneToMany(mappedBy = "custumer", cascade = CascadeType.ALL)
    private Set<Order> orders = new HashSet<>();


    public void add(Order order) {
        if (orders != null) {
            orders = new HashSet<>();
        }

        orders.add(order);

        order.setCustomer(this);
    }
}

package com.dleawebsystem.ecommerce.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "orders")
@Getter
@Setter
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "order_tracking_number")
    private String orderTrackingNumber;

    @Column(name = "total_quantity")
    private int totalQuantity;

    @Column(name = "total_price")
    private BigDecimal totalPrice;

    @Column(name = "status")
    private String status;

    @Column
    @CreationTimestamp
    private Date dateCreated;

    @Column(name = "Last_updated")
    @UpdateTimestamp
    private Date LastUpdated;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "order")
    private Set<OrderItem> orderItems = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "shipping_address_id", referencedColumnName = "id")
    private Address shippingAddress;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "billing_address_id", referencedColumnName = "id")
    private Address billingAddress;

    public void add(OrderItem item) {
        if (orderItems != null) {
            orderItems = new HashSet<>();
        }

        orderItems.add(item);
        item.setOrder(this);
    }
}

/*O que é this?
this é uma palavra-chave em Java que refere-se à instância atual da classe.
Dentro de um método de uma classe, this é utilizado para se referir ao objeto atual da classe.
No método add, this se refere ao objeto da classe onde o método está sendo chamado. Portanto, item.setOrder(this) configura o item (OrderItem) para ter uma
referência ao objeto atual (Order).*/

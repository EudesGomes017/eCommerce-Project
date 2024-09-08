package com.dleawebsystem.ecommerce.dto;

import com.dleawebsystem.ecommerce.entity.Address;
import com.dleawebsystem.ecommerce.entity.Customer;
import com.dleawebsystem.ecommerce.entity.Order;
import com.dleawebsystem.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Order order;
    private Address shippingAddress;
    private Address billingAddress;
    private Set<OrderItem> orderItems;
}

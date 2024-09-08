package com.dleawebsystem.ecommerce.service;

import com.dleawebsystem.ecommerce.dao.CustumerRepository;
import com.dleawebsystem.ecommerce.dto.Purchase;
import com.dleawebsystem.ecommerce.dto.PurchaseResponse;
import com.dleawebsystem.ecommerce.entity.Customer;
import com.dleawebsystem.ecommerce.entity.Order;
import com.dleawebsystem.ecommerce.entity.OrderItem;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Service
public class CkeckoutServiceImpl implements CheckoutService {

    @Autowired
    private CustumerRepository custumerRepository;

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {

        // retrive the order info from dto
        Order order = purchase.getOrder();

        // generate tracking number
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        //populate order with orderItems
        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item ->  order.add(item));

        // populate order with billingAddress and shippingAddress
        order.setBillingAddress((purchase.getBillingAddress()));
        order.setShippingAddress(purchase.getShippingAddress());

        // populate customer with order
        Customer customer = purchase.getCustomer();
        customer.add(order);

        // save to the database
        custumerRepository.save((customer));

        // return a response

        return  new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {

         // generate a random UUID (UUID version-4)

        return UUID.randomUUID().toString();
    }
}

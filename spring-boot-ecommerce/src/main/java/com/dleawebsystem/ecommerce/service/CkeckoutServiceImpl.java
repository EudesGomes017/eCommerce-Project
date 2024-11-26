package com.dleawebsystem.ecommerce.service;

import com.dleawebsystem.ecommerce.dao.CustumerRepository;
import com.dleawebsystem.ecommerce.dto.PaymentInfoDTO;
import com.dleawebsystem.ecommerce.dto.Purchase;
import com.dleawebsystem.ecommerce.dto.PurchaseResponse;
import com.dleawebsystem.ecommerce.entity.Customer;
import com.dleawebsystem.ecommerce.entity.Order;
import com.dleawebsystem.ecommerce.entity.OrderItem;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CkeckoutServiceImpl implements CheckoutService {

    @Autowired
    private CustumerRepository custumerRepository;

    public CkeckoutServiceImpl(@Value("${stripe.key.secret}") String secretKey) {

        // initialize Stripe API with secret key
        Stripe.apiKey = secretKey;
    }

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

        // check if this is an existing customer
        String theEmail = customer.getEmail();

        Customer customerFromDB = customerFromDB = custumerRepository.findByEmail((theEmail));

        if (customerFromDB != null) {
            // we found them ... let's assign them accordingly
            customer = customerFromDB;
        }


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


    @Override
    public PaymentIntent createPaymentInent(PaymentInfoDTO paymentInfo) throws StripeException {
        // Lista de tipos de método de pagamento (no caso, "card" para cartão de crédito)
        List<String> paymentMethodTypes = new ArrayList<>();
        paymentMethodTypes.add("card");

        // Mapa de parâmetros para criar o PaymentIntent
        Map<String, Object> params = new HashMap<>();
        params.put("amount", paymentInfo.getAmount());  // Valor da transação
        params.put("currency", paymentInfo.getCurrency());  // Moeda da transação
        params.put("payment_method_types", paymentMethodTypes);  // Tipos de método de pagamento
        params.put("description", "DLEA PURCHASE");
        params.put("receipt_email", paymentInfo.getReceiptEmail());

        // Cria o PaymentIntent utilizando os parâmetros e retorna o resultado
        return PaymentIntent.create(params);
    }

}


























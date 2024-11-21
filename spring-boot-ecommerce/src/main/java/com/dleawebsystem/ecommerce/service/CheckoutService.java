package com.dleawebsystem.ecommerce.service;

import com.dleawebsystem.ecommerce.dto.PaymentInfoDTO;
import com.dleawebsystem.ecommerce.dto.Purchase;
import com.dleawebsystem.ecommerce.dto.PurchaseResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);

    PaymentIntent createPaymentInent(PaymentInfoDTO paymenteInfo) throws StripeException;
}

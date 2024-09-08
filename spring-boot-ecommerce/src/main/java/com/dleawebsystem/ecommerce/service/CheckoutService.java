package com.dleawebsystem.ecommerce.service;

import com.dleawebsystem.ecommerce.dto.Purchase;
import com.dleawebsystem.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}

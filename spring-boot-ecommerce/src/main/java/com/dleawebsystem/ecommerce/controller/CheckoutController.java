package com.dleawebsystem.ecommerce.controller;

import com.dleawebsystem.ecommerce.dto.Purchase;
import com.dleawebsystem.ecommerce.dto.PurchaseResponse;
import com.dleawebsystem.ecommerce.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin ( "http://localhost:4200" )
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    @Autowired
    private CheckoutService checkoutService;


    @PostMapping("/purchase")
    public PurchaseResponse placOrder(@RequestBody Purchase purchase) {

        PurchaseResponse purchaseResponse = checkoutService.placeOrder((purchase));

        return purchaseResponse;
    }
}

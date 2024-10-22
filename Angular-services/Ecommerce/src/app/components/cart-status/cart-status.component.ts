import { AuthService } from 'src/app/service/auth.service';
import { CartService } from './../../service/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  totalPrice: number = 0.00;
  totalQuantaty: number = 0;
  isLoggedIn: boolean = false;


  constructor(private cartService: CartService, private authService: AuthService) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }
  updateCartStatus() {

    // subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    // subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantaty = data
    );

  }

}

import { CartService } from 'src/app/service/cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/service/product.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-products-datails',
  templateUrl: './products-datails.component.html',
  styleUrls: ['./products-datails.component.css'],
})
export class ProductsDatailsComponent implements OnInit {

  product!: Product;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }
  handleProductDetails() {
    // get the "id" param string. convert string to a number using the "+" symbol
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProduct(theProductId).subscribe(data => {
      this.product = data;
      console.log("teste", data)
    });
  }


  addToCart() {

    console.log(`Adding to cart: ${this.product.name}, ${this.product.unitPrice}`);
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem)

    }
}

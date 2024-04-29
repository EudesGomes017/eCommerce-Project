import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  //templateUrl: './product-list.component.html',
  templateUrl: './product-list-table.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];


  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.lisProducts();
  }

  lisProducts() {
    this.productService.getProductList().subscribe(
      data => {
        this.products = data;
      }

    )


  }
}

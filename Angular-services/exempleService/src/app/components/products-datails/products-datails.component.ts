import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-products-datails',
  templateUrl: './products-datails.component.html',
  styleUrls: ['./products-datails.component.css'],
})
export class ProductsDatailsComponent implements OnInit {
  product!: Product;

  constructor(
    private productService: ProductService,
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
}

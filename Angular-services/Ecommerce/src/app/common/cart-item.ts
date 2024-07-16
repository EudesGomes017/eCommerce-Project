import { Product } from 'src/app/common/product';
export class CartItem {

  id: string;
  name: string;
  imagUrl: string;
  unitPrice: number;

  quantity: number;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.imagUrl = product.imageUrl;
    this.unitPrice = product.unitPrice;

    this.quantity = 1;
  }


}

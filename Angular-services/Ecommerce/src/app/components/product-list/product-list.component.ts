import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  //templateUrl: './product-list.component.html',
  // templateUrl: './product-list-table.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string = "";



  constructor(private productService: ProductService,
              private route: ActivatedRoute,
                private cartService: CartService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }

  }

  handleSearchProducts() {

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    //if we have a different keyword than previous
    //then set thePageNumber to 1

    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);

    // now search for the products using keyword
    this.productService.searchProductsPaginate(this.thePageNumber -1,
                                              this.thePageSize,
                                              theKeyword).subscribe(this.processResult());
  }

  handleListProducts() {

    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else {
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
    }

    //
    //Check if we have a different category than previous
    //Note: Angular will reuse a component if it is currently being viewed
    //

    //if we have a different category id than previous
    // then set thePageNumber back to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);



    // now get the products for the given category id
    this.productService.getProductListPaginate(this.thePageNumber -1, this.thePageSize, this.currentCategoryId)
                    .subscribe(this.processResult());
  }



  updatePageSize(pageSize: string) {

    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listProducts();

  }

  processResult() {
    return (data: any) => {
     this.products = data._embedded.products;
     this.thePageNumber = data.page.number + 1;
     this.thePageSize = data.page.size;
     this.theTotalElements = data.page.totalElements;
    }
   }




  addToCart(theProduct: Product) {

    console.log(`teste ${theProduct.name},  ${theProduct.unitPrice}`)

    // Todo ... do the real work
    const theCartItem = new CartItem(theProduct)

    this.cartService.addToCart(theCartItem);

  }

}
/*Este é um método em um componente Angular que busca uma lista de produtos com base em uma categoria específica. Vamos analisar o código linha por linha:

const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id'); - Verifica se o parâmetro "id" está presente na URL atual. Ele usa this.route.snapshot.paramMap para acessar os parâmetros da URL naquele momento específico.

if (hasCategoryId) { ... } - Se o parâmetro "id" estiver presente na URL, então:

a. this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!; - Obtém o valor do parâmetro "id" da URL usando this.route.snapshot.paramMap.get('id') e o converte em um número usando o operador +. O ! no final é uma asserção de que o valor não será nulo, o que pode acontecer se o parâmetro não estiver presente, evitando assim um erro de compilação.

else { ... } - Se o parâmetro "id" não estiver presente na URL, então:

a. this.currentCategoryId = 1; - Define this.currentCategoryId como 1 como um valor padrão.

this.productService.getProductList(this.currentCategoryId).subscribe(...) - Chama o método getProductList do serviço productService, passando this.currentCategoryId como argumento. Este método provavelmente faz uma chamada HTTP para buscar a lista de produtos para a categoria fornecida.

a. .subscribe(data => { this.products = data; }) - Assina o Observable retornado por getProductList. Quando os dados da resposta HTTP estiverem disponíveis, eles serão atribuídos à variável this.products, que provavelmente será usada para exibir a lista de produtos na interface do usuário.

Resumindo, este método listProducts() é responsável por obter uma lista de produtos com base no ID da categoria presente na URL atual, ou usar o ID da categoria padrão (1) se não houver nenhum ID na URL. Ele então atualiza a lista de produtos na interface do usuário com os dados recuperados. */

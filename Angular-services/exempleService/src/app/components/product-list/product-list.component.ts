import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  //templateUrl: './product-list.component.html',
  // templateUrl: './product-list-table.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {

  products: Product[] = []
  currentCategoryId: number = 1;
  searchMode: boolean = false;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

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

    // now search for the products using keyword
    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    )
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

    // now get the products for the given category id
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
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

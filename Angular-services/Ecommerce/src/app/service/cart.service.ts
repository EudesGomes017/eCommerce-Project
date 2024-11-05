import { BehaviorSubject, Subject } from 'rxjs';

import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  //criação do starage
  //storage: Storage = sessionStorage;
  storage: Storage = localStorage;

  constructor() {

    //read data from storage
    let data = JSON.parse(this.storage.getItem('cartItems')!)

    if (data != null) {
      this.cartItems = data;

      // compute totals based on the data that is read from storage
      this.computeCartTotals();
    }

  }

  addToCart(theCartItem: CartItem) {

    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined;

    existingCartItem = this.cartItems.find(
      (item) => item.id === theCartItem.id
    );

    if (this.cartItems.length > 0) {


      existingCartItem = this.cartItems.find(
        (tempCartItem) => tempCartItem.id === theCartItem.id
      );
      /* for (let tempCartItem of this.cartItems) {
        if (tempCartItem.id === theCartItem.id) {
          existingCartItem = tempCartItem;
          break;
        }
      }*/

      // chack if we found it
      alreadyExistsInCart = existingCartItem != undefined;
    }

    if (alreadyExistsInCart) {
      existingCartItem!.quantity++;
    } else {
      // just add the item to the array
      this.cartItems.push(theCartItem);
    }


    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }


    this.totalPrice.next(totalPriceValue); // next() envia o evento
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);

    // persist cart data
    this.persistCartItems();
  }

  persistCartItems() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems))
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart');

    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name:  ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice},
        subTotalPrice=${subTotalPrice}`);
    }

    console.log(
      `totalPrice: ${totalPriceValue.toFixed(
        2
      )}, totalQuantity: ${totalQuantityValue}`
    );
    console.log('------');
  }

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;

    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    } else {
      this.computeCartTotals();
    }
  }
  remove(theCartItem: CartItem) {
    // get index of item in the array
    const itemIndex = this.cartItems.findIndex(
      (tempCartItem) => tempCartItem.id === theCartItem.id
    );

    // if found, remove the item from the array at the given index
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);

      this.computeCartTotals();
    }
  }
}
/*Propriedades:

cartItems: Um array (CartItem[]) que guarda os itens atualmente no carrinho.
totalPrice: Um Subject<number> do RxJS, provavelmente usado para notificar mudanças no preço total do carrinho.
totalQuantity: Outro Subject<number>, usado para notificar mudanças na quantidade total de itens no carrinho.
Constructor:

O construtor está vazio (constructor() {}), indicando que não há lógica adicional de inicialização além da inicialização
das propriedades.
Método addToCart:

Propósito: Adiciona um CartItem ao carrinho e atualiza o preço e a quantidade totais.
Parâmetros: theCartItem é o item a ser adicionado ao carrinho (tipo CartItem).
Lógica:
Verifica se cartItems já contém itens (if (this.cartItems.length > 0)).
Itera através de cartItems para verificar se theCartItem já existe (for (let tempCartItem of this.cartItems)).
Se theCartItem existe (existingCartItem é definido), incrementa a quantidade (existingCartItem.quantity++).
Se theCartItem não existe (alreadyExistsInCart é falso), adiciona theCartItem a cartItems (this.cartItems.push(theCartItem)
).
Após modificar cartItems, chama this.computeCartTotals() para atualizar totalPrice e totalQuantity.
Observações:
RxJS Subjects: Subject<number> do RxJS são usados aqui para gerenciar e notificar assinantes (como componentes de UI)
sobre mudanças em totalPrice e totalQuantity.
CartItem: Presumivelmente uma classe ou interface que define as propriedades de um item no carrinho (id, quantity, etc.).
Este trecho de código trata funcionalidades básicas de um sistema de carrinho de compras: adicionar itens, atualizar
quantidades e notificar assinantes sobre mudanças totais usando Subjects do RxJS. Para uma implementação completa, seria
necessário definir CartItem e implementar computeCartTotals() para atualizar totalPrice e totalQuantity com base no
conteúdo de cartItems. */

/*------------------------------------------------------------------------------------------------------------------- */

/*Explicação: Função computeCartTotals()
Variáveis totalPriceValue e totalQuantityValue:

totalPriceValue: Armazena o valor total de todos os itens no carrinho (quantity * unitPrice).
totalQuantityValue: Armazena a quantidade total de todos os itens no carrinho (quantity).
Iteração pelos itens do carrinho:

Um loop for...of é usado para percorrer todos os itens presentes no array cartItems.
Para cada item (currentCartItem), calcula-se o subtotal (quantity * unitPrice) e adiciona-se aos totais totalPriceValue e
totalQuantityValue.
Publicação dos novos valores:

this.totalPrice.next(totalPriceValue);: Notifica os assinantes (subscribers) sobre o novo valor do preço total do carrinho.
this.totalQuantity.next(totalQuantityValue);: Notifica os assinantes sobre a nova quantidade total de itens no carrinho.
Chamada de logCartData():

Após calcular os totais, chama o método logCartData() para registrar os detalhes do carrinho no console, incluindo o nome,
 quantidade, preço unitário e subtotal de cada item, bem como o preço total e a quantidade total. */

/*-------------------------------------------------------------------------------------------------------------------
 Os métodos decrementQuantity e remove que você tem em Angular estão relacionados à manipulação de itens em um carrinho de compras. Vamos explicar cada um deles:

Método decrementQuantity(theCartItem: CartItem)
Este método é responsável por reduzir a quantidade de um item específico no carrinho. Aqui está o que cada parte faz:

Decrementa a quantidade:

typescript
Copiar código
theCartItem.quantity--;
Isso simplesmente diminui a quantidade do item theCartItem em 1 unidade.

Verifica se a quantidade é zero:

typescript
Copiar código
if (theCartItem.quantity === 0) {
  this.remove(theCartItem);
}
Após diminuir a quantidade, verifica se ela chegou a zero. Se sim, chama o método remove(theCartItem) para remover completamente o item do carrinho.

Atualiza totais do carrinho:

typescript
Copiar código
else {
  this.computeCartTotals();
}
Se a quantidade não for zero, significa que ainda há itens no carrinho, então o método computeCartTotals() é chamado para recalcular os totais do carrinho, como subtotal, impostos, e total geral.

Método remove(theCartItem: CartItem)
Este método é chamado quando um item precisa ser removido completamente do carrinho. Aqui está o que ele faz:

Encontra o índice do item no array cartItems:

typescript
Copiar código
const itemIndex = this.cartItems.findIndex( tempCartItem => tempCartItem.id === theCartItem.id)
Utiliza findIndex para encontrar o índice do item dentro do array cartItems onde o id do item corresponde ao id do theCartItem.

Remove o item se encontrado:

typescript
Copiar código
if (itemIndex > -1) {
  this.cartItems.splice(itemIndex, 1);
}
Verifica se o itemIndex é maior que -1 (ou seja, se o item foi encontrado no array). Se encontrado, utiliza splice para remover o item do array cartItems.

Atualiza totais do carrinho:

typescript
Copiar código
this.computeCartTotals();
Após remover o item do carrinho, chama computeCartTotals() para recalcular os totais do carrinho, garantindo que os totais reflitam a remoção do item.

Considerações
Esses métodos são partes essenciais de um sistema de carrinho de compras em Angular. Eles permitem adicionar lógica para manipular itens individuais (como decrementar a quantidade) e para remover itens por completo do carrinho, garantindo que os totais sejam sempre atualizados conforme as ações do usuário. Certifique-se de que CartItem e computeCartTotals() estão devidamente definidos e implementados no seu código para que esses métodos funcionem corretamente.




-----------------------------------------------------
1. Criação do Storage

Vamos analisar o trecho de código que você forneceu, que parece ser parte de uma classe em TypeScript, possivelmente em um componente Angular. Esse código se relaciona ao gerenciamento de itens de um carrinho de compras, usando o sessionStorage.

1. Criação do Storage
typescript
Copiar código
storage: Storage = sessionStorage;
Aqui, você está declarando uma propriedade chamada storage do tipo Storage, e a inicializando com sessionStorage. Isso significa que você usará o sessionStorage para armazenar dados temporariamente durante a sessão do navegador.
2. Construtor
typescript
Copiar código
constructor() {
    //read data from storage
    let data = JSON.parse(this.storage.getItem('cartItems')!)
O constructor é chamado quando uma instância da classe é criada.
this.storage.getItem('cartItems')! tenta recuperar os dados armazenados com a chave 'cartItems' do sessionStorage.
O operador ! indica que você está afirmando que o valor não será null ou undefined, mas é uma boa prática fazer uma verificação posterior, pois getItem pode retornar null se não houver nenhum valor associado à chave.
JSON.parse(...) tenta converter a string JSON recuperada em um objeto JavaScript.
3. Verificação e Atribuição de Dados
typescript
Copiar código
if (data != null) {
    this.cartItems = data;

    // compute totals based on the data that is read from storage
    this.computeCartTotals();
}
Aqui, você verifica se data não é null. Se não for, significa que existem itens no carrinho que foram previamente salvos.
this.cartItems = data; atribui os dados recuperados à propriedade cartItems da classe.
this.computeCartTotals(); chama um método (que não está mostrado) que provavelmente calcula os totais do carrinho com base nos itens que foram carregados.
4. Persistindo Itens do Carrinho
typescript
Copiar código
persistCartItems() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
}
Este método, persistCartItems, é responsável por salvar os itens do carrinho de volta no sessionStorage.
JSON.stringify(this.cartItems) converte o objeto cartItems em uma string JSON, que pode ser armazenada.
this.storage.setItem('cartItems', ...) armazena essa string no sessionStorage sob a chave 'cartItems'.
Resumo
O código configura um armazenamento em sessão para gerenciar os itens de um carrinho de compras.
Ao instanciar a classe, ele tenta recuperar os itens do carrinho armazenados anteriormente e calcular os totais se houver dados.
O método persistCartItems é utilizado para armazenar o estado atual do carrinho de volta no sessionStorage.
Essa abordagem ajuda a manter o estado do carrinho de compras do usuário durante a sessão, permitindo que
ele adicione, remova ou modifique itens, e ainda preserve esses dados mesmo se a página for recarregada.


 */

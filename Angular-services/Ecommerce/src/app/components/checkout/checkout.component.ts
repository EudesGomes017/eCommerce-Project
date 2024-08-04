import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutFormGrup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formsEvent();
  }

  formsEvent() {
    this.checkoutFormGrup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),

      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),

      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),

      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        experationMonth: [''],
        expirationYear: [''],
      }),
    });
  }

  onSubmit() {
    console.log('Handling the submit button');
    console.log(this.checkoutFormGrup.get('customer')?.value);
  }

  copyShippingAddressToBillingAddress(event: Event) {
    if ((event.target as HTMLInputElement).checked) {
      this.checkoutFormGrup.controls['billingAddress'].setValue(
        this.checkoutFormGrup.controls['shippingAddress'].value
      );
    } else {
      this.checkoutFormGrup.controls['billingAddress'].reset();
    }
  }
}
























/*Vamos fazer uma análise detalhada de cada parte do código Angular fornecido para o CheckoutComponent.

Importações
typescript
Copiar código
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs';
Component: Decorador que define uma classe como um componente Angular. Ele recebe um objeto de configuração que inclui o seletor, template e estilos do componente.
OnInit: Interface que define um método de ciclo de vida (ngOnInit) que é chamado após o Angular inicializar o componente. Ideal para inicializar dados.
FormBuilder: Serviço utilizado para criar instâncias de FormGroup e FormControl com menos código.
FormGroup: Classe que representa um grupo de controles de formulário. É utilizado para gerenciar um conjunto de FormControl e FormGroup.
first: Operador RxJS para emitir o primeiro valor de um Observable e completar a sequência. (Não é utilizado no código fornecido e pode ser removido.)
Decorador @Component
typescript
Copiar código
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
selector: O seletor CSS usado para incluir este componente em templates de outros componentes. Aqui, app-checkout seria utilizado em HTML para renderizar este componente.
templateUrl: Caminho para o arquivo HTML que define o template visual do componente. O Angular irá usar este arquivo para renderizar o conteúdo do componente.
styleUrls: Caminho para o(s) arquivo(s) CSS que aplicam estilos específicos a este componente.
Classe CheckoutComponent
typescript
Copiar código
export class CheckoutComponent implements OnInit {
export: Permite que a classe seja importada em outros módulos ou componentes.
CheckoutComponent: Nome da classe do componente.
implements OnInit: Indica que a classe está implementando a interface OnInit, o que significa que ela precisa definir o método ngOnInit.
Propriedades
typescript
Copiar código
checkoutFormGrup!: FormGroup;
totalPrice: number = 0;
totalQuantity: number = 0;
checkoutFormGrup: É uma instância de FormGroup que representa o formulário de checkout. O ! é um operador de negação de valor nulo (non-null assertion operator) que informa ao TypeScript que a variável será inicializada posteriormente.
totalPrice e totalQuantity: Variáveis para armazenar o preço total e a quantidade total, respectivamente. Inicializadas com 0.
Construtor
typescript
Copiar código
constructor(private formBuilder: FormBuilder) {}
formBuilder: Serviço injetado para facilitar a criação e gerenciamento de formulários reativos. O Angular injeta este serviço quando cria o componente.
Método ngOnInit
typescript
Copiar código
ngOnInit(): void {
  this.formsEvent();
}
ngOnInit: Método do ciclo de vida do Angular chamado após a construção do componente e inicialização dos dados. Aqui, ele é usado para chamar o método formsEvent que configura o formulário.
Método formsEvent
typescript
Copiar código
formsEvent() {
  this.checkoutFormGrup = this.formBuilder.group({
    customer: this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
    }),
    shippingAddress: this.formBuilder.group({
      street: [''],
      city: [''],
      state: [''],
      country: [''],
      zipCode: [''],
    }),
    billingAddress: this.formBuilder.group({
      street: [''],
      city: [''],
      state: [''],
      country: [''],
      zipCode: [''],
    }),
    creditCard: this.formBuilder.group({
      cardType: [''],
      nameOnCard: [''],
      cardNumber: [''],
      securityCode: [''],
      experationMonth: [''],
      expirationYear: [''],
    }),
  });
}
formsEvent: Método para inicializar checkoutFormGrup com um novo FormGroup. Este método cria um formulário reativo com sub-grupos para diferentes seções do checkout:

customer: Grupo para informações do cliente, com controles para firstName, lastName e email. Inicialmente todos com valores vazios.
shippingAddress: Grupo para o endereço de envio, contendo controles para street, city, state, country e zipCode.
billingAddress: Grupo para o endereço de cobrança, similar ao de envio.
creditCard: Grupo para informações do cartão de crédito, com controles para cardType, nameOnCard, cardNumber, securityCode, experationMonth e expirationYear.
Método onSubmit
typescript
Copiar código
onSubmit() {
  console.log('Handling the submit button');
  console.log(this.checkoutFormGrup.get('customer')?.value);
}
onSubmit: Método chamado quando o formulário é enviado. Ele:
Imprime uma mensagem de log no console para indicar que o botão de envio foi clicado.
Imprime o valor do grupo de controle customer no console. O operador de encadeamento opcional (?.) é usado para evitar erros caso o controle customer seja null ou undefined.
Método copyShippingAddressToBillingAddress
typescript
Copiar código
copyShippingAddressToBillingAddress(event: Event) {
  if((event.target as HTMLInputElement).checked) {
    this.checkoutFormGrup.controls['billingAddress']
    .setValue(this.checkoutFormGrup.controls['shippingAddress'].value);
  } else {
    this.checkoutFormGrup.controls['billingAddress'].reset();
  }
}
copyShippingAddressToBillingAddress: Método que é chamado quando uma caixa de seleção é marcada ou desmarcada. Ele:
Verifica se a caixa de seleção (event.target) está marcada usando (event.target as HTMLInputElement).checked.
Se marcada, copia o valor do endereço de envio (shippingAddress) para o endereço de cobrança (billingAddress).
Se desmarcada, reseta os campos do endereço de cobrança para os valores padrão (vazios).
Resumo
O CheckoutComponent é um componente Angular que gerencia um formulário de checkout. Ele utiliza o serviço FormBuilder para criar um formulário reativo com múltiplos grupos de controle. A classe define métodos para inicializar o formulário, manipular a submissão e copiar o endereço de envio para o endereço de cobrança, além de manipular o ciclo de vida do componente usando o ngOnInit.



 */

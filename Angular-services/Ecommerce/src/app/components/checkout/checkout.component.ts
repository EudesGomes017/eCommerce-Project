import { ShopFormService } from './../../service/shop-form.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/service/cart.service';
import { ShopValidators } from 'src/app/validators/shop-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {

  checkoutFormGrup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = []

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(private formBuilder: FormBuilder, private shopFormService: ShopFormService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {

    this.reviewCartDetails();

    this.formsEvent();
  }

  reviewCartDetails() {


      //subscribe to cartService.totalQuantity
      this.cartService.totalQuantity.subscribe(
        totalQuantity => this.totalQuantity = totalQuantity
      )

      //subscribe to cartService.totalPrice
      this.cartService.totalPrice.subscribe(
        totalPrice => this.totalPrice = totalPrice
      )

  }

  formsEvent() {
    this.checkoutFormGrup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
        email: new FormControl('',
          [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),

      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
      }),

      billingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
      }),

      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
        cardNumber: new FormControl('', [Validators.required, ShopValidators.cardNumberValidator]),
        securityCode: new FormControl('',  [Validators.required, Validators.pattern(/^\d{3,4}$/)]),
        experationMonth: [''],
        expirationYear: [''],
      }),
    });


    // populate credit card months
    const startMonth: number = new Date().getMonth() + 1;
    console.log("startMonth: " + startMonth)

    this.shopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    )

    // populate credit card years

    this.shopFormService.getCreditCardYears().subscribe(
      data => {
        console.log("Retrieved credit card year: " + JSON.stringify(data));
        this.creditCardYears = data;

      }
    )


    // populate coountries
    this.shopFormService.getCountries().subscribe(
      data => {
        console.log("Retrieved countries: " + JSON.stringify(data));
        this.countries = data;
      }
    )
  }

  onSubmit() {
    console.log('Handling the submit button');

    if (this.checkoutFormGrup.invalid) {
      this.checkoutFormGrup.markAllAsTouched();
    }
    console.log(this.checkoutFormGrup.get('customer')!.value);

    console.log("The email address is " + this.checkoutFormGrup.get('customer')!.value.email);
    console.log("The shipping address counry is " + this.checkoutFormGrup.get('shippingAddress')!.value.country.name);
    console.log("The shipping address state is " + this.checkoutFormGrup.get('shippingAddress')!.value.state.name);
  }

  get firstName() {
    return this.checkoutFormGrup.get('customer.firstName');
  }
  get lastName() {
    return this.checkoutFormGrup.get('customer.lastName');
  }
  get email() {
    return this.checkoutFormGrup.get('customer.email');
  }

  get shippingAddressStreet() {
    return this.checkoutFormGrup.get('shippingAddress.street');
  }
  get shippingAddressCity() {
    return this.checkoutFormGrup.get('shippingAddress.city');
  }
  get shippingAddressState() {
    return this.checkoutFormGrup.get('shippingAddress.state');
  }
  get shippingAddressCountry() {
    return this.checkoutFormGrup.get('shippingAddress.country');
  }
  get shippingAddressZipCode() {
    return this.checkoutFormGrup.get('shippingAddress.zipCode');
  }

  get billingAddressStreet() {
    return this.checkoutFormGrup.get('billingAddress.street');
  }
  get billingAddressCity() {
    return this.checkoutFormGrup.get('billingAddress.city');
  }
  get billingAddressState() {
    return this.checkoutFormGrup.get('billingAddress.state');
  }
  get billingAddressCountry() {
    return this.checkoutFormGrup.get('billingAddress.country');
  }
  get billingAddressZipCode() {
    return this.checkoutFormGrup.get('billingAddress.zipCode');
  }


  get creditCardType() {
    return this.checkoutFormGrup.get('creditCard.cardType');
  }
  get creditCardNameOnCard() {
    return this.checkoutFormGrup.get('creditCard.nameOnCard');
  }
  get creditCardNumber() {
    return this.checkoutFormGrup.get('creditCard.cardNumber');
  }
  get creditCardSecurityCode() {
    return this.checkoutFormGrup.get('creditCard.securityCode');
  }

  copyShippingAddressToBillingAddress(event: Event) {
    if ((event.target as HTMLInputElement).checked) {
      this.checkoutFormGrup.controls['billingAddress'].setValue(
        this.checkoutFormGrup.controls['shippingAddress'].value);

      //Fix for states
      this.billingAddressStates = this.shippingAddressStates;

    } else {
      this.checkoutFormGrup.controls['billingAddress'].reset();

      this.billingAddressStates = [];
    }
  }

  handleMonthsAndYears() {

    const creditCardFormGroup = this.checkoutFormGrup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup!.value.expirationYear);


    // if the current year equals the selected year, then start with the current month

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;

    }
    else {
      startMonth = 1;
    }

    this.shopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    )



  }

  getState(formGroupName: string) {

    const formGroup = this.checkoutFormGrup.get(formGroupName);

    const countryCode = formGroup!.value.country.code;
    const countryName = formGroup!.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.shopFormService.getStates(countryCode).subscribe(data => {
      if (formGroupName === 'shippingAddress') {
        this.shippingAddressStates = data;
      }
      else {
        this.billingAddressStates = data;
      }

      formGroup!.get('state')!.setValue(data[0])
    }
    );
  }

  //para detectar os cleintes financeiros dso cartões

  /*Análise do Código Atual
  Seu método detectCardType atualiza o tipo de cartão com base no número inserido, mas não parece exibir mensagens de erro. Ele apenas define o valor do tipo de cartão com base no prefixo detectado. Aqui estão os pontos principais para verificar:

  Remoção de Espaços: cleanedCardNumber remove espaços corretamente, o que é bom.

  Detecção do Tipo de Cartão:

  Visa: Detecta se o número começa com '4'.
  MasterCard: Detecta se os dois primeiros dígitos estão no intervalo correto ou estão dentro do novo intervalo.
  American Express: Detecta se os dois primeiros dígitos são '34' ou '37'.
  Comprimento do Número: Só faz a detecção se o comprimento for de pelo menos 13 dígitos. Se for menor, o tipo é limpo. */
  detectCardType(): void {
    this.checkoutFormGrup.get('creditCardNumber.cardNumber')?.valueChanges.subscribe((cardNumber) => {
      const cleanedCardNumber = cardNumber.replace(/\s+/g, ''); // Remove espaços
      const firstDigit = cleanedCardNumber.charAt(0);
      const firstTwoDigits = cleanedCardNumber.substring(0, 2);
      let cardType = this.checkoutFormGrup.get('creditCardNumber.cardType');

      if (cleanedCardNumber.length >= 13 && cleanedCardNumber.length <= 19) {
        if (firstDigit === '4') {
          cardType?.setValue('Visa');

        } else if (firstTwoDigits >= '51' && firstTwoDigits <= '55' || (firstTwoDigits >= '2221' && firstTwoDigits <= '2720')) {
          cardType?.setValue('MasterCard');

        } else if (firstTwoDigits === '34' || firstTwoDigits === '37') {
          cardType?.setValue('American Express');
        } else {
          cardType?.setValue('Unknown');
        }
      } else {
        cardType?.setValue(''); // Clear the card type if the number is too short
      }
    });
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
O CheckoutComponent é um componente Angular que gerencia um formulário de checkout. Ele utiliza o serviço FormBuilder para criar um formulário
reativo com múltiplos grupos de controle. A classe define métodos para inicializar o formulário, manipular a submissão e copiar o endereço de envio para o endereço de cobrança, além de manipular o ciclo de vida do componente usando o ngOnInit.

-----------------------------------------------------------------------------------------------



Explicação Detalhada:
Obtenção do Formulário de Cartão de Crédito:

typescript
Copiar código
const creditCardFormGroup = this.checkoutFormGrup.get('creditCard');
Aqui, você está acessando o formulário de cartão de crédito (creditCard) dentro de um grupo de formulários (checkoutFormGrup). O método get
é
usado para recuperar o controle do formulário associado ao nome 'creditCard'.

Obtendo o Ano Atual e o Ano Selecionado:

typescript
Copiar código
const currentYear: number = new Date().getFullYear();
const selectedYear: number = Number(creditCardFormGroup!.value.expirationYear);
currentYear: Obtém o ano atual usando o objeto Date do JavaScript.
selectedYear: Obtém o ano de expiração selecionado do valor do controle do formulário. A conversão para Number é feita para garantir que
selectedYear seja um número.
Definição do Mês de Início:

typescript
Copiar código
let startMonth: number;

if (currentYear === selectedYear) {
  startMonth = new Date().getMonth() + 1;
}
else {
  startMonth = 1;
}
Se o ano atual (currentYear) é igual ao ano selecionado (selectedYear), define startMonth como o mês atual (obtido com getMonth() + 1, já que o
s meses no JavaScript são baseados em zero).
Se o ano atual não é igual ao ano selecionado, define startMonth como 1 (janeiro), assumindo que para anos futuros, qualquer mês é aceitável.
Chamada ao Serviço para Obter os Meses Disponíveis:

typescript
Copiar código
this.shopFormService.getCreditCardMonths(startMonth).subscribe(
  data => {
    console.log("Retrieved credit card months: " + JSON.stringify(data));
    this.creditCardMonths = data;
  }
)
getCreditCardMonths(startMonth): Chama um método no serviço (shopFormService) para obter os meses de expiração do cartão de crédito a partir do
mês de início definido.
.subscribe(data => { ... }): Assina a Observable retornada pelo serviço para lidar com a resposta assíncrona. Quando os dados são recebidos,
eles são logados no console e atribuídos à propriedade creditCardMonths do componente.
Resumo:
Esse método handleMonthsAndYears ajusta a lista de meses disponíveis para o usuário selecionar com base no ano de expiração do cartão de
crédito que foi inserido no formulário. Se o ano selecionado for o ano atual, ele começa a lista a partir do mês atual. Caso contrário, ele
começa do mês de janeiro. Após definir o mês de início, ele solicita os meses disponíveis através de um serviço e atualiza a lista no
componente com os dados recebidos.

 */

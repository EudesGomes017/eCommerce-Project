import { ShopFormService } from './../../service/shop-form.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
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

  constructor(private formBuilder: FormBuilder, private shopFormService: ShopFormService) { }

  ngOnInit(): void {
    this.formsEvent();
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

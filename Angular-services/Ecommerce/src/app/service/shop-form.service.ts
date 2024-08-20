import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root',
})
export class ShopFormService {

  private countriesUrl = 'http://localhost:8086/api/countries';
  private statesUrl = 'http://localhost:8086/api/states';

  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]> {

    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }

  getStates(theCountryCode: string): Observable<State[]> {

    // search url
    const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;

    return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
      map(response => response._embedded.states)
    );
  }


  getCreditCardMonths(startMonth: number): Observable<number[]> {

    let data: number[] = [];

    // build an array for "Month" dropdown list
    // - start at current month and loop until

    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }

    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {

    let data: number[] = [];

    // build an array for "Year" downlist list
    // - start at current year and loop for next 10 years

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }

    return of(data);
  }

}

interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  }
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  }

}

































/*Vamos analisar detalhadamente a classe ShopFormService que você forneceu. Essa classe parece ser parte de um serviço em um aplicativo Angular, responsável por fornecer dados relacionados a cartões de crédito, como meses e anos válidos para seleção.

Aqui está a classe completa para referência:


Análise Detalhada
1. Importações e Dependências
A classe ShopFormService provavelmente está sendo usada em um contexto onde a funcionalidade do RxJS está disponível. Isso inclui a função of do RxJS, que cria um Observable a partir de um array ou valor.

Certifique-se de importar Observable e of do RxJS no início do arquivo:



Vamos analisar detalhadamente a classe ShopFormService que você forneceu. Essa classe parece ser parte de um serviço em um aplicativo Angular, responsável por fornecer dados relacionados a cartões de crédito, como meses e anos válidos para seleção.

Aqui está a classe completa para referência:

typescript
Copiar código
export class ShopFormService {
  constructor() {}

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];

    // build an array for  "Month" dropdown list
    // - start at current month and loop until

    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }

    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {
    let data: number[] = [];

    // build an array for "Year" dropdown list
    // - start at current year and loop for next 10 years

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }

    return of(data);
  }
}
Análise Detalhada
1. Importações e Dependências
A classe ShopFormService provavelmente está sendo usada em um contexto onde a funcionalidade do RxJS está disponível. Isso inclui a função of do RxJS, que cria um Observable a partir de um array ou valor.

Certifique-se de importar Observable e of do RxJS no início do arquivo:

typescript
Copiar código
import { Observable, of } from 'rxjs';
2. Construtor
O construtor da classe é vazio e não faz nada no momento. Isso é comum em serviços que não precisam inicializar nada específico ao serem criados.


3. Método getCreditCardMonths
Este método gera um Observable que emite um array de números representando os meses válidos para seleção em um formulário de cartão de crédito.

Parâmetro: startMonth (número) — mês inicial a partir do qual a lista deve começar.
Lógica:
Cria um array vazio data.
Utiliza um laço for para adicionar meses ao array começando do startMonth até 12 (o último mês do ano).
Retorno: Um Observable criado com of(data), onde data é o array de meses.
typescript
Copiar código
getCreditCardMonths(startMonth: number): Observable<number[]> {
  let data: number[] = [];

  for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
    data.push(theMonth);
  }

  return of(data);
}
4. Método getCreditCardYears
Este método gera um Observable que emite um array de números representando os anos válidos para seleção em um formulário de cartão de crédito.

Lógica:
Cria um array vazio data.
Obtém o ano atual usando new Date().getFullYear().
Define o ano final como 10 anos no futuro.
Utiliza um laço for para adicionar anos ao array começando do ano atual até o ano final.
Retorno: Um Observable criado com of(data), onde data é o array de anos.
typescript
Copiar código
getCreditCardYears(): Observable<number[]> {
  let data: number[] = [];

  const startYear: number = new Date().getFullYear();
  const endYear: number = startYear + 10;

  for (let theYear = startYear; theYear <= endYear; theYear++) {
    data.push(theYear);
  }

  return of(data);
}
Resumo
A classe ShopFormService fornece dois métodos principais:

getCreditCardMonths(startMonth: number): Retorna um Observable com uma lista de meses a partir de startMonth até 12.
getCreditCardYears(): Retorna um Observable com uma lista de anos a partir do ano atual até 10 anos no futuro.
Esses métodos são úteis para preencher listas suspensas (dropdowns) em formulários de pagamento, ajudando o usuário a selecionar um mês e ano válidos para cartões de crédito. */

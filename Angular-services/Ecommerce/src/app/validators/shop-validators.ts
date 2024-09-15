import { FormControl, ValidationErrors } from '@angular/forms';

export class ShopValidators {
  static notOnlyWhitespace(control: FormControl): ValidationErrors | null {
    if (control.value != null && typeof control.value === 'string' && control.value.trim().length === 0) {
      return { 'notOnlyWhitespace': true };
    }
    return null;
  }

  // Validador para o formato do número do cartão
  static cardNumberValidator(control: FormControl): ValidationErrors | null {
    const value = control.value;

    // Verifica se o valor é uma string e não é nulo
    if (typeof value !== 'string') {
      return null; // Retorna null se o valor não for uma string (nenhum erro)
    }

    const cleanedValue = value.replace(/\s+/g, ''); // Remove espaços

    // Verifica o comprimento e formato do número do cartão
    if (!/^\d{13,19}$/.test(cleanedValue)) {
      return { invalidCardNumber: true };
    }

    // Verifica o número do cartão usando Luhn
    const luhnValidation = ShopValidators.luhnCheck(cleanedValue);
    return luhnValidation ? { invalidCardNumber: true } : null;
  }

  // Função para verificar o número do cartão usando o algoritmo de Luhn
  static luhnCheck(value: string): boolean {
    if (!value || typeof value !== 'string') {
      return true; // Retorna erro se o valor não for uma string válida
    }

    let sum = 0;
    let shouldDouble = false;

    for (let i = value.length - 1; i >= 0; i--) {
      let digit = parseInt(value.charAt(i), 10);

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 !== 0; // Retorna verdadeiro se a soma não for divisível por 10
  }
}


/*Claro, vamos explorar a classe ShopValidators detalhadamente. Essa classe define validadores personalizados que você pode usar em formulários reativos no Angular. Vamos detalhar cada método e entender seu funcionamento e propósito.

1. Importações
typescript
Copiar código
import { FormControl, ValidationErrors } from '@angular/forms';
FormControl é uma classe do Angular que representa um controle de formulário individual. É usado para manipular e validar valores em um formulário.
ValidationErrors é um tipo de objeto que representa os erros de validação de um controle de formulário. Ele é retornado por validadores e pode conter várias chaves para diferentes tipos de erros.
2. Classe ShopValidators
Essa classe contém métodos estáticos que são utilizados como validadores personalizados em formulários Angular.

2.1. Método notOnlyWhitespace
typescript
Copiar código
static notOnlyWhitespace(control: FormControl): ValidationErrors | null {
  if (control.value != null && typeof control.value === 'string' && control.value.trim().length === 0) {
    return { 'notOnlyWhitespace': true };
  }
  return null;
}
Propósito: Verifica se o valor de um campo de formulário não é apenas espaços em branco.
Parâmetros:
control: O FormControl que está sendo validado.
Funcionamento:
Verificação: Se control.value não é nulo e é uma string, e se o valor após remoção de espaços em branco (trim()) tem comprimento 0, significa que o valor contém apenas espaços em branco.
Retorno:
Se o valor contém apenas espaços em branco, retorna um objeto { 'notOnlyWhitespace': true } que indica que o campo é inválido.
Se não, retorna null, indicando que não há erros de validação.
2.2. Método cardNumberValidator
typescript
Copiar código
static cardNumberValidator(control: FormControl): ValidationErrors | null {
  const value = control.value;

  // Verifica se o valor é uma string e não é nulo
  if (typeof value !== 'string') {
    return null; // Retorna null se o valor não for uma string (nenhum erro)
  }

  const cleanedValue = value.replace(/\s+/g, ''); // Remove espaços

  // Verifica o comprimento e formato do número do cartão
  if (!/^\d{13,19}$/.test(cleanedValue)) {
    return { invalidCardNumber: true };
  }

  // Verifica o número do cartão usando Luhn
  const luhnValidation = ShopValidators.luhnCheck(cleanedValue);
  return luhnValidation ? { invalidCardNumber: true } : null;
}
Propósito: Valida o número do cartão de crédito para garantir que está no formato correto e atende aos critérios básicos de validade.
Parâmetros:
control: O FormControl que está sendo validado.
Funcionamento:
Verificação do Tipo de Valor: Se control.value não é uma string, o validador retorna null (não há erro).
Limpeza do Valor: Remove espaços do valor do cartão usando replace.
Verificação de Comprimento e Formato: Usa uma expressão regular para garantir que o número do cartão tenha entre 13 e 19 dígitos.
Verificação de Luhn: Chama ShopValidators.luhnCheck para validar o número do cartão usando o algoritmo de Luhn.
Retorno:
Se o formato ou a verificação de Luhn falha, retorna { invalidCardNumber: true }.
Caso contrário, retorna null, indicando que o número do cartão é válido.
2.3. Método luhnCheck
typescript
Copiar código
static luhnCheck(value: string): boolean {
  if (!value || typeof value !== 'string') {
    return true; // Retorna erro se o valor não for uma string válida
  }

  let sum = 0;
  let shouldDouble = false;

  for (let i = value.length - 1; i >= 0; i--) {
    let digit = parseInt(value.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble; // Alterna o estado de dobrar o dígito
  }

  return sum % 10 !== 0; // Retorna verdadeiro se a soma não for divisível por 10
}
Propósito: Implementa o algoritmo de Luhn, que é um método para verificar a validade de números de cartões de crédito.
Parâmetros:
value: O número do cartão de crédito como uma string.
Funcionamento:
Verificação do Tipo de Valor: Verifica se value é uma string. Se não for, retorna true (indicando um erro, porque o número do cartão é inválido).
Cálculo de Luhn:
Iteração: Percorre cada dígito do número do cartão, começando pelo final.
Duplicação Condicional: Dobra o dígito se o estado shouldDouble for verdadeiro. Se o dígito dobrado for maior que 9, subtrai 9.
Soma: Adiciona o dígito (ajustado se necessário) à soma total.
Alterna Estado: Alterna o estado shouldDouble a cada dígito.
Retorno: Retorna true se a soma não for um múltiplo de 10, indicando que o número do cartão é inválido.
Conclusão
A classe ShopValidators oferece uma maneira de validar campos de formulário com regras específicas:

notOnlyWhitespace: Verifica se um campo contém apenas espaços em branco.
cardNumberValidator: Verifica se o número do cartão de crédito está no formato correto e passa a verificação de Luhn.
luhnCheck: Implementa o algoritmo de Luhn para validar o número do cartão de crédito.
Esses validadores ajudam a garantir que os dados inseridos pelos usuários atendam a certos critérios de formato e validade, melhorando a robustez e a precisão dos formulários em sua aplicação */
import { FormControl, ValidationErrors } from '@angular/forms';

export class ShopValidators {
  // Validador para verificar se o campo não contém apenas espaços em branco
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
      shouldDouble = !shouldDouble; // Alterna o estado de dobrar o dígito
    }

    return sum % 10 !== 0; // Retorna verdadeiro se a soma não for divisível por 10
  }
}

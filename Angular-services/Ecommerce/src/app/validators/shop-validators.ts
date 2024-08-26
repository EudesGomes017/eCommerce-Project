import { FormControl, ValidationErrors } from '@angular/forms';

export class ShopValidators {
  static notOnlyWhitespace(control: FormControl): ValidationErrors | null {
    // Check if the control value is not null and contains only whitespace
    if (control.value != null && typeof control.value === 'string' && control.value.trim().length === 0) {
      // Invalid, return error object
      return { 'notOnlyWhitespace': true };
    }
    // Valid, return null (no errors)
    return null;
  }

  // Validador para o formato do número do cartão
  static cardNumberValidator(control: FormControl): ValidationErrors | null {
    const value = control.value.replace(/\s+/g, ''); // Remove espaços

    // Verifica o comprimento e formato do número do cartão
    if (!/^\d{13,19}$/.test(value)) {
      return { invalidCardNumber: true };
    }

    // Verifica o número do cartão usando Luhn
    const luhnValidation = ShopValidators.luhnCheck(value);
    return luhnValidation ? { invalidCardNumber: true } : null;
  }


    static luhnCheck(control: FormControl): ValidationErrors | null {
    const value = control.value;

    // Verifica se o valor é uma string não vazia
    if (value && typeof value === 'string') {
      let sum = 0;
      let shouldDouble = false;

      // Itera pelos dígitos do número do cartão, do final para o início
      for (let i = value.length - 1; i >= 0; --i) {
        let digit = parseInt(value.charAt(i), 10);

        // Dobra o dígito se necessário e ajusta o valor
        if (shouldDouble) {
          if ((digit *= 2) > 9) digit -= 9;
        }

        // Acumula o valor ajustado na soma
        sum += digit;
        shouldDouble = !shouldDouble; // Alterna o estado de dobrar o dígito
      }

      // Retorna erro se a soma não for múltiplo de 10
      if (sum % 10 !== 0) {
        return { luhnCheck: true };
      }
    }

    return null; // Retorna null se o número do cartão for válido
  }
}

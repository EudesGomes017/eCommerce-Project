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


  static cardNumberValidator(control: FormControl): ValidationErrors | null {
    const value = control.value.replace(/\s+/g, ''); /
    if (!/^\d{13,19}$/.test(value)) {
      return { invalidCardNumber: true };
    }
    const luhnValidation = ShopValidators.luhnCheck(value);
    return luhnValidation ? { invalidCardNumber: true } : null;
  }


    static luhnCheck(control: FormControl): ValidationErrors | null {
    const value = control.value;

    if (value && typeof value === 'string') {
      let sum = 0;
      let shouldDouble = false;

      for (let i = value.length - 1; i >= 0; --i) {
        let digit = parseInt(value.charAt(i), 10);

        if (shouldDouble) {
          if ((digit *= 2) > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble; 
      }

      if (sum % 10 !== 0) {
        return { luhnCheck: true };
      }
    }

    return null;
  }
}

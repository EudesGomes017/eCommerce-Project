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







/*Explicação das Correções
Tipo de Retorno do Validador:

O método notOnlyWhitespace deve retornar ValidationErrors | null. No código original, você retornava apenas ValidationErrors, mas em casos onde
não há erro, a função deve retornar null, conforme o padrão do Angular.
Checagem Adicional de Tipo:

Adicionamos uma verificação para garantir que o control.value seja uma string (typeof control.value === 'string'). Isso evita erros se o
valor for null ou de um tipo diferente.

Alteramos o nome do método para notOnlyWhitespace, seguindo a convenção camelCase.
Uso do Validador Personalizado
Para usar o validador notOnlyWhitespace em um formulário reativo, você pode fazer o seguinte:

No componente Angular:

typescript

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
})
export class ExampleComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      myField: ['', [ShopValidators.notOnlyWhitespace]]
    });
  }

  onSubmit() {
    if (this.myForm.invalid) {
      // Lógica para lidar com formulários inválidos
      console.log('Formulário inválido');
      return;
    }
    // Processamento do formulário
    console.log('Formulário enviado com sucesso');
  }
}
No template HTML:

html
Copiar código
<form [formGroup]="myForm" (ngSubmit)="onSubmit()">
  <label for="myField">Campo:</label>
  <input id="myField" formControlName="myField">
  <div *ngIf="myForm.get('myField').hasError('notOnlyWhitespace') && myForm.get('myField').touched">
    O campo não pode conter apenas espaços em branco.
  </div>
  <button type="submit">Enviar</button>
</form>
Conclusão
A função notOnlyWhitespace agora está corretamente configurada para ser usada como um validador personalizado em formulários Angular.
Ela verifica se o valor de um campo contém apenas espaços em branco e retorna um erro se for o caso. Caso contrário, retorna null, indicando
que o campo é válido. Este padrão é consistente com a maneira como o Angular lida com validação de formulários e ajudará a garantir que seu
formulário funcione conforme o esperado.



 */

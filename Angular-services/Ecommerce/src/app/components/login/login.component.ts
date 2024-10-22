import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  storage: Storage = sessionStorage;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const email = this.loginForm.get('email')?.value; // Obtém o email do formulário
    const password = this.loginForm.get('password')?.value;

    if (this.loginForm.valid) {

      const credentials = {
        email: email, // Usa o email dinâmico
        password: password
      };

      // Armazena o e-mail no sessionStorage
      this.storage.setItem('email', JSON.stringify(email));


      this.authService.login(credentials).subscribe(
        response => {
        //  console.log('Resposta após login:', response); // Verifique a resposta aqui também


          const token = response.token; // Ajuste conforme a estrutura da sua resposta
          const userFullName = response.userFullName; // Supondo que a resposta contenha o nome do usuário

          this.storage.setItem('token', token); // Armazena o token no sessionStorage
          this.storage.setItem('userFullName', userFullName); // Armazena o nome do usuário

           // Atualize o estado de autenticação
           // this.authService.isLoggedInSubject.next(true); // Isso deve disparar o comportamento do LoginStatusComponent

          // Redireciona após o login
          this.router.navigate(['/home']);

         // sessionStorage.removeItem('token');

         console.log("resposta : ", response)

        },
        error => {
          console.error('Login falhou', error);
        }
      );
    }
  }


}

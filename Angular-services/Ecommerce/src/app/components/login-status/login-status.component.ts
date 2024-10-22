import { LoginComponent } from './../login/login.component';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css'
})
export class LoginStatusComponent {

  isAuthenticated: boolean = false;
  userFullName: string = '';

  storage: Storage = sessionStorage;

  private subscriptions: Subscription = new Subscription()

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.subscriptions.add(
      this.authService.isLoggedIn$.subscribe(isLoggedIn => {
        this.isAuthenticated = isLoggedIn;
        if(isLoggedIn) {
          this.userFullName = sessionStorage.getItem('userFullName') || '';// Recuperando o nome do usuário do sessionStorage
        } else {
          this.userFullName = '';
        }
      })
    )
  }

  logout(): void {
    this.authService.logout();
    sessionStorage.removeItem('userFullName'); // Remover o nome do usuário ao sair
    this.router.navigate(['/login']); // Redirecionar após logout se necessário
  }
}

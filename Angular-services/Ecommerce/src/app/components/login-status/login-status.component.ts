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

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }



  logout(): void {
    this.authService.logout();
    sessionStorage.removeItem('userFullName'); // Remover o nome do usuário ao sair
    this.router.navigate(['/login']); // Redirecionar após logout se necessário
  }
}
/*Explicação detalhada do que ocorre em ngOnInit:
Adicionar Assinatura ao subscriptions:

this.subscriptions.add(...) adiciona uma nova assinatura a subscriptions, que está gerenciando as assinaturas do componente. Isso facilita o gerenciamento de múltiplos observáveis.
Observable isLoggedIn$:

this.authService.isLoggedIn$ é um Observable que provavelmente está configurado no authService e emite o status de autenticação do usuário (verdadeiro ou falso).
Esse Observable é usado para ouvir alterações no status de autenticação do usuário em tempo real.
Callback da Assinatura:

subscribe(isLoggedIn => {...}): Quando o Observable isLoggedIn$ emite um valor, ele é capturado pela função subscribe, e a função de callback recebe o parâmetro isLoggedIn, que é true ou false.
Atualizar o Estado de Autenticação:

this.isAuthenticated = isLoggedIn; atualiza uma variável do componente (isAuthenticated) com o valor recebido (true ou false), permitindo que o componente saiba se o usuário está autenticado.
Recuperar Nome do Usuário (se autenticado):

Se o usuário estiver autenticado (isLoggedIn é true), o nome do usuário é recuperado do sessionStorage, usando sessionStorage.getItem('userFullName').
sessionStorage.getItem busca o nome armazenado temporariamente na sessão, e o operador || '' fornece um valor padrão vazio se o dado não estiver presente.
Zerar Nome do Usuário (se não autenticado):

Se o usuário não estiver autenticado (isLoggedIn é false), userFullName é definido como uma string vazia '' para limpar as informações pessoais do usuário no componente.
3. Método logout
Este método é responsável por realizar o logout do usuário, limpar as informações da sessão e redirecionar para a tela de login.

typescript
Copiar código
logout(): void {
    this.authService.logout();
    sessionStorage.removeItem('userFullName'); // Remover o nome do usuário ao sair
    this.router.navigate(['/login']); // Redirecionar após logout se necessário
  }
Explicação detalhada do que ocorre em logout:
Chamada para logout no AuthService:

this.authService.logout() aciona o método de logout no serviço de autenticação, authService.
Esse método geralmente desabilita o status de login do usuário e finaliza a sessão no backend.
Remover Dados do Usuário do sessionStorage:

sessionStorage.removeItem('userFullName') remove o nome do usuário armazenado na sessão para garantir que esses dados não sejam mantidos após o logout.
Redirecionar para a Tela de Login:

this.router.navigate(['/login']) usa o roteador Angular (router) para navegar até a rota de login (/login), redirecionando o usuário após o logout.
Observações Finais
Gerenciamento de Assinaturas: Adicionar assinaturas a um objeto centralizado (subscriptions) permite que todas as assinaturas sejam finalizadas com segurança quando o componente é destruído. Isso é útil para prevenir vazamentos de memória.
sessionStorage: é ideal para dados temporários, pois seus dados são mantidos apenas durante a sessão do navegador. */

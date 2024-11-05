import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

interface LoginResponse {
  userFullName: string;
  token: string;
  email: string; // Adicione esta linha
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8086/api'; // URL do seu back-end

  public isLoggedInSubject = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('userFullName', response.userFullName); // Armazenando o nome do usuário
        this.isLoggedInSubject.next(true);
      })
    );
  }

  logout(): void {
    sessionStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}


/*Vamos examinar detalhadamente o código fornecido, que faz parte de um serviço de autenticação em Angular. Ele usa BehaviorSubject para gerenciar e emitir o estado de autenticação do usuário e define métodos de login, logout, e verificação do token de autenticação.

Explicação Geral
O código apresenta um serviço de autenticação em Angular que utiliza BehaviorSubject para fornecer um estado reativo de autenticação, além de utilizar o HttpClient para realizar solicitações de login e sessionStorage para armazenar o token do usuário na sessão atual do navegador. Esse serviço gerencia o login, logout e verifica se o usuário está autenticado.

1. isLoggedInSubject e isLoggedIn$
typescript
Copiar código
public isLoggedInSubject = new BehaviorSubject<boolean>(false);
isLoggedIn$ = this.isLoggedInSubject.asObservable();
isLoggedInSubject: É uma instância de BehaviorSubject com um valor inicial false. BehaviorSubject é um tipo de Observable que mantém o último valor emitido, o que é útil para armazenar o estado atual de autenticação (logado ou não) e reemitir esse valor sempre que necessário.
O valor false inicial indica que, ao carregar o aplicativo, o usuário é considerado deslogado até que se autentique.
isLoggedIn$: É um Observable derivado de isLoggedInSubject através do método asObservable. Isso permite que outros componentes possam ouvir mudanças no estado de autenticação, sem terem permissão para modificar diretamente isLoggedInSubject.
Qualquer atualização feita em isLoggedInSubject será refletida automaticamente em isLoggedIn$.
2. Construtor
typescript
Copiar código
constructor(private http: HttpClient, private router: Router) {}
O construtor recebe duas dependências:
HttpClient: É usado para fazer solicitações HTTP, como o login.
Router: É usado para realizar redirecionamentos de página, como o redirecionamento para a tela de login após o logout.
Essas dependências são injetadas automaticamente pelo Angular através do Injeção de Dependência (DI).

3. Método login
typescript
Copiar código
login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('userFullName', response.userFullName); // Armazenando o nome do usuário
        this.isLoggedInSubject.next(true);
      })
    );
  }
Este método é responsável por autenticar o usuário.

Requisição de Login:

this.http.post<LoginResponse>(${this.apiUrl}/login, credentials): envia uma requisição HTTP POST para a API, passando as credenciais do usuário (email e password). A resposta esperada (LoginResponse) é tipada para facilitar o uso das propriedades no código.
LoginResponse (tipagem da resposta) deve conter propriedades como token e userFullName.
Encadeamento com pipe e tap:

pipe é usado para encadear operadores RxJS.
tap(response => {...}): tap permite realizar ações secundárias com a resposta da API sem modificar os dados. No caso:
Salvar Token: sessionStorage.setItem('token', response.token) salva o token JWT (ou similar) no sessionStorage, permitindo que a aplicação autentique o usuário em requisições subsequentes.
Salvar Nome do Usuário: sessionStorage.setItem('userFullName', response.userFullName) armazena o nome completo do usuário na sessão, possibilitando que outros componentes acessem e exibam o nome.
Atualizar Estado de Autenticação: this.isLoggedInSubject.next(true) emite true, indicando que o usuário está autenticado. Todos os componentes que subscrevem isLoggedIn$ serão notificados da mudança e saberão que o usuário agora está logado.
Retorno:

O método retorna o Observable da requisição http.post, permitindo que o componente que chamou login trate a resposta ou possíveis erros da autenticação.
4. Método logout
typescript
Copiar código
logout(): void {
    sessionStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }
Este método é responsável por realizar o logout do usuário.

Remover Token:

sessionStorage.removeItem('token') exclui o token do sessionStorage, finalizando a sessão de autenticação do usuário.
Atualizar Estado de Autenticação:

this.isLoggedInSubject.next(false) emite false, atualizando o estado de autenticação para "não autenticado".
Todos os componentes que escutam isLoggedIn$ são notificados dessa mudança e podem reagir, como ocultar informações restritas ao usuário logado.
Redirecionamento:

this.router.navigate(['/login']) redireciona o usuário para a página de login após o logout.
5. Método getToken
typescript
Copiar código
getToken(): string | null {
    return sessionStorage.getItem('token');
  }
Este método recupera o token armazenado no sessionStorage.

Retorna o token como uma string, se existir, ou null caso o token não esteja presente.
Esse método é útil para recuperar o token sempre que precisar realizar chamadas autenticadas para a API.
6. Método isAuthenticated
typescript
Copiar código
isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
Este método verifica se o usuário está autenticado.

Validação de Autenticação:
Usa this.getToken() para verificar se o token está armazenado no sessionStorage.
Retorna true se o token existir e false se não existir.
Resumo
Esse serviço é projetado para fornecer um gerenciamento eficiente e reativo da autenticação do usuário:

O BehaviorSubject é o núcleo para emitir o estado de autenticação.
sessionStorage armazena dados de sessão, como o token e o nome do usuário.
Métodos login e logout gerenciam o fluxo de entrada e saída, enquanto isAuthenticated verifica o status.




Você disse:
uma explicação de Subscription
O ChatGPT disse:

A classe Subscription no Angular é parte do pacote RxJS (Reactive Extensions for JavaScript) e é usada para gerenciar e controlar assinaturas em observáveis. Em Angular, as Subscriptions são comumente usadas para escutar e responder a eventos, dados assíncronos e fluxos contínuos, como o estado de autenticação ou mudanças de dados em tempo real. Vamos entender seu propósito e funcionamento detalhadamente:

O que é uma Subscription?
Em termos simples, uma Subscription representa uma conexão ativa com um observable. Quando você se inscreve (subscribe) em um observable, você cria uma Subscription, que permite receber e responder a novos valores emitidos pelo observable até que você decida cancelar a inscrição (unsubscribe). Esse cancelamento é importante para liberar recursos e evitar vazamentos de memória.

Como Funciona?
A Subscription segue estes passos principais:

Inscrição (Subscription): Ao usar o método .subscribe() em um observable, você inicia uma Subscription. Essa ação cria um "vínculo" que permite ao código escutar as emissões do observable.

Recepção de Dados: Sempre que o observable emite novos dados, a Subscription ativa o código especificado no .subscribe(), como uma função de callback, para responder a esses dados.

Cancelamento da Inscrição (Unsubscribe): Quando não for mais necessário escutar o observable, é possível cancelar a Subscription chamando o método .unsubscribe(). Esse processo encerra a conexão e libera recursos, essencial em aplicativos de longa duração (como apps SPA) para evitar vazamentos de memória.

Exemplo Simples de Uso de Subscription
Aqui está um exemplo básico de uso de Subscription com um observable:

typescript
Copiar código
import { Observable, Subscription } from 'rxjs';

// Criando um observable que emite valores
const myObservable = new Observable(subscriber => {
  subscriber.next(1); // Emite valor
  subscriber.next(2); // Emite outro valor
  subscriber.complete(); // Finaliza o observable
});

// Criando uma subscription para escutar o observable
const mySubscription: Subscription = myObservable.subscribe({
  next(value) { console.log('Recebido:', value); },
  complete() { console.log('Observável finalizado.'); }
});

// Se necessário, cancelar a inscrição
mySubscription.unsubscribe();
Subscription no Angular
No contexto do Angular, Subscription é amplamente usada para gerenciar dados e eventos assíncronos em componentes e serviços. Abaixo está um exemplo de uso típico com HttpClient:

typescript
Copiar código
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

export class MyComponent {
  private dataSubscription: Subscription;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Iniciando uma Subscription para escutar a resposta do request
    this.dataSubscription = this.http.get('/api/data').subscribe(data => {
      console.log('Dados recebidos:', data);
    });
  }

  ngOnDestroy(): void {
    // Cancelar a Subscription ao destruir o componente
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}
Por Que Usar Unsubscribe?
Em Angular, especialmente em aplicações de larga escala, não cancelar uma Subscription pode causar problemas de vazamento de memória. Isso ocorre porque o observável continuará emitindo dados, e o componente ou serviço que iniciou a inscrição manterá referências em memória mesmo quando não é mais necessário.

Gerenciamento de Múltiplas Subscriptions
Se um componente Angular possui várias Subscriptions, você pode gerenciá-las mais facilmente usando um objeto de Subscription composto:

typescript
Copiar código
import { Subscription } from 'rxjs';

export class MyComponent {
  private subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    // Adicionando várias subscriptions a um único objeto
    this.subscriptions.add(this.firstObservable.subscribe(...));
    this.subscriptions.add(this.secondObservable.subscribe(...));
  }

  ngOnDestroy(): void {
    // Cancela todas as subscriptions adicionadas
    this.subscriptions.unsubscribe();
  }
}
Neste exemplo, this.subscriptions.unsubscribe() encerrará todas as Subscriptions ao mesmo tempo, simplificando o gerenciamento.

Resumo
Subscription: Representa uma inscrição ativa em um observable.
Unsubscribe: Cancela a inscrição, liberando recursos.
Uso em Angular: Fundamental para gerenciar dados assíncronos, principalmente em ngOnInit e ngOnDestroy.
Boas práticas: Sempre cancele suas Subscriptions (especialmente em componentes) para evitar vazamentos de memória em aplicações de longa duração.
Esse gerenciamento eficiente garante que o aplicativo Angular seja performático e evita problemas de desempenho a longo prazo. */

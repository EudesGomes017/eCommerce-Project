import { AuthService } from 'src/app/service/auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Usar `from` para converter o método assíncrono `handleAccess` em um Observable
    return from(this.handleAccess(request, next)).pipe(
      // Trocar para o fluxo da requisição com o token, se aplicável
      switchMap((modifiedRequest: HttpRequest<any>) => next.handle(modifiedRequest))
    );
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpRequest<any>> {
    // URLs de endpoints protegidos
    const securedEndpoints = [
      'http://localhost:8086/api/orders',
      'http://localhost:8086/api/orders/search',
      'http://localhost:8086/api/checkout',
      'http://localhost:8086/api/orders/search/findByCustomerEmailOrderByDateCreatedDesc'
    ];

    // Verificar se a URL da requisição está na lista de endpoints protegidos
    if (securedEndpoints.some(url => request.urlWithParams.includes(url))) {
      // Buscar o token de acesso de forma assíncrona
      const accessToken = await this.authService.getToken();

      // Se o token existir, clonar a requisição adicionando o cabeçalho de autorização
      //obs temos que clonar por que o token é imutavel
      if (accessToken) {
        return request.clone({
          headers: request.headers.set('Authorization', `Bearer ${accessToken}`)
        });
      }
    }

    // Se o endpoint não estiver protegido ou não houver token, retornar a requisição original
    return request;
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from '../common/purchase';
import { environment } from 'src/environments/environment';
import { PaymentInfo } from '../common/payment-info';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  // private purchaseUrl = 'https://localhost:8443/api/checkout/purchase';
  private purchaseUrl = environment.apiUrl + '/checkout/purchase';

  private paymentIntentUrl = environment.apiUrl + '/checkout/paymentintent';


  constructor(private httpClient: HttpClient) { }

  // Método para adicionar o token de autenticação no cabeçalho
 /* private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Ou de onde você armazena o token
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }*/

  placeOrder(purchase: Purchase): Observable<any> {
    //const headers = this.createHeaders(); // Incluindo o cabeçalho de autorização
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase);
  }

  //criando  faz a chamada no backend da intensão de pagamento
  createPaymentIntent(paymentInfo: PaymentInfo): Observable<any> {
    //const headers = this.createHeaders(); // Incluindo o cabeçalho de autorização
    return this.httpClient.post<PaymentInfo>(this.paymentIntentUrl, paymentInfo)
  }



}

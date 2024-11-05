import { Component } from '@angular/core';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderHistoryService } from 'src/app/service/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent {

  orderHistoryList: OrderHistory[] = [];
  storage: Storage = sessionStorage;

  constructor(private orderHistoryService: OrderHistoryService) {

  }

  ngOnInit(): void {
    this.handleOrderHistory();

  }

  handleOrderHistory() {
    const theEmail = JSON.parse(this.storage.getItem('userEmail')!);

    console.log('E-mail recuperado do sessionStorage:', theEmail);

    // Verifica se theEmail é nulo ou indefinido
    if (!theEmail) {
      console.error('E-mail não encontrado. Verifique se o usuário está logado.');
      return; // Interrompe a execução se o e-mail for nulo
    }

    // Realiza a requisição ao serviço
    this.orderHistoryService.getOrderHistory(theEmail).subscribe(
      data => {
        if (data && data._embedded && data._embedded.orders) {
          this.orderHistoryList = data._embedded.orders;
        } else {
          console.error('Nenhum dado retornado para o histórico de pedidos.');
        }
      },
      error => {
        console.error('Erro ao buscar o histórico de pedidos:', error);
      }
    );
  }


}

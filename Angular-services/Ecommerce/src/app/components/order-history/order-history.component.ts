import { Component } from '@angular/core';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderHistoryService } from 'src/app/service/order-history.service';
import { CommonModule } from '@angular/common';

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

    this.orderHistoryService.getOrderHistory(theEmail).subscribe(
      data => {
        if (data) {
          this.orderHistoryList = data._embedded.orders
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

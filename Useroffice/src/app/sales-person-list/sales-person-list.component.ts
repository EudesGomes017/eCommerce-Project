import { Component, OnInit } from '@angular/core';
import { SalesPerson } from './sales-person';


@Component({
  selector: 'app-sales-person-list',
  templateUrl: './sales-person-list-bootstrap.component.html',
  styleUrls: ['./sales-person-list.component.css'],
})
export class SalesPersonListComponent implements OnInit {
  salesPersonList: SalesPerson[] = [
    new SalesPerson('Eudes', 'Gomes', 'eudesgomes@gmail.com', 50000),
    new SalesPerson('Eloa', 'Alicia', 'eloa@gmail.com', 40000),
    new SalesPerson('Davi', 'Lucas', 'Davi@gmail.com', 30000),
    new SalesPerson('dani', 'gomes', 'dani@gmail.com', 40000),
  ];

  constructor() {}

  ngOnInit(): void {}
}

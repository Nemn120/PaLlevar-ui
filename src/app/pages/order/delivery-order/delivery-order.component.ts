import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeliveryOrderDetailComponent} from '../delivery-order-detail/delivery-order-detail.component';

@Component({
  selector: 'app-delivery-order',
  templateUrl: './delivery-order.component.html',
  styleUrls: ['./delivery-order.component.scss']
})
export class DeliveryOrderComponent implements OnInit {

  
  displayedColumns: string[] = ['position', 'name', 'precio', 'symbol'];
  dataSource = ELEMENT_DATA;

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  public attendOrder(row :PeriodicElement){
 
    this.dialog.open(DeliveryOrderDetailComponent, {
      width: '400px',
      data: row
    });
  }
     

}

export interface PeriodicElement {
  name: string;
  position: number;
  precio: number;
  symbol: string;
}

 
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Ceviche', precio: 20.00, symbol: 'Cev'},
  {position: 2, name: 'Pollo a la brasa', precio: 30.00, symbol: 'PB'},
  {position: 3, name: 'Pescado frito', precio:10.00, symbol: 'PF'},
  {position: 4, name: 'Jalea mixta', precio: 20.00, symbol: 'JM'},
  {position: 5, name: 'Arroz con mariscos', precio: 20.00, symbol: 'AM'},
  {position: 6, name: 'Arroz con pollo', precio: 12.00, symbol: 'AP'},
  {position: 7, name: 'Tallarin Verde', precio: 12.00, symbol: 'TV'},
  {position: 8, name: 'Seco a la norteña', precio: 10.00, symbol: 'SN'},
  {position: 9, name: 'Pollo broaster',precio: 12.00, symbol: 'PB'},
  {position: 10, name: 'Aji de gallina', precio: 10.00, symbol: 'AG'},
];



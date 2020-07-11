import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetallesComponent} from '../detalles/detalles.component';

@Component({
  selector: 'app-mostrar-pedidos',
  templateUrl: './mostrar-pedidos.component.html',
  styleUrls: ['./mostrar-pedidos.component.scss']
})
export class MostrarPedidosComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  public attendOrder(row :PeriodicElement){
 
    this.dialog.open(DetallesComponent, {
      width: '400px',
      data: row
    });
  }
     

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Ceviche', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Pollo a la Brasa', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Arroz con pollo', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Jale Mixta', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Carapulcra', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Chicharron de pescado', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Aji de gallina', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Causa', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Tallarin verde', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Chuleta', weight: 20.1797, symbol: 'Ne'},
];



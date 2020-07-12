import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from "@angular/material/dialog";
import { DialogoConfirmacionComponent } from "../dialogo-confirmacion/dialogo-confirmacion.component";


@Component({
  selector: 'app-attend-order-detail',
  templateUrl: './attend-order-detail.component.html',
  styleUrls: ['./attend-order-detail.component.scss']
})
export class AttendOrderDetailComponent  {
  
 

  displayedColumns = ['select', 'position', 'name', 'precio', 'symbol'];
  data = Object.assign( ELEMENT_DATA);
  dataSource = new MatTableDataSource<Element>(this.data);
  selection = new SelectionModel<Element>(true, []);
  constructor(public dialogo: MatDialog
    ){
    console.log(this.data);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  atenderPedido() : void{


    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: '¿Desea atender los pedidos seleccionados?'
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado){
          this.selection.selected.forEach(item => {
            let index: number = this.data.findIndex(d => d === item);
            console.log(this.data.findIndex(d => d === item));
            this.data.splice(index,1)
            this.dataSource = new MatTableDataSource<Element>(this.data);
          });
          this.selection = new SelectionModel<Element>(true, []);
        }
  });
}



  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  precio: number;
  symbol: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Ceviche', precio: 20.00, symbol: 'CEV'},
  {position: 2, name: 'Pollo a la brasa', precio: 30.00, symbol: 'PB'},
  {position: 3, name: 'Pescado frito', precio:10.00, symbol: 'PF'},
  {position: 4, name: 'Jalea mixta', precio: 20.00, symbol: 'JM'},
  {position: 5, name: 'Arroz con mariscos', precio: 20.00, symbol: 'AM'},
  {position: 6, name: 'Arroz con pollo', precio: 12.00, symbol: 'AP'},
  {position: 7, name: 'Tallarin Verde', precio: 12.00, symbol: 'TV'},
  {position: 8, name: 'Seco de pollo', precio: 10.00, symbol: 'SN'},
  {position: 9, name: 'Pollo broaster',precio: 12.00, symbol: 'PB'},
  {position: 10, name: 'Aji de gallina', precio: 10.00, symbol: 'AG'},
  {position: 11, name: 'Arroz con pato', precio: 20.00, symbol: 'AP'},
  {position: 12, name: 'Causa', precio: 10.00, symbol: 'CAU'},
  {position: 13, name: 'Escabeche ', precio:10.00, symbol: 'ES'},
  {position: 14, name: 'Chicharron ', precio: 20.00, symbol: 'CHI'},
  {position: 15, name: 'Seco de pollo', precio: 15.00, symbol: 'SP'},
  {position: 16, name: 'Arroz chaufa', precio: 12.00, symbol: 'AC'},
  {position: 17, name: 'Tallarin rojo', precio: 12.00, symbol: 'TR'},
  {position: 18, name: 'Tallarin saltado', precio: 10.00, symbol: 'TS'},
  {position: 19, name: 'Hamburguesa',precio: 10.00, symbol: 'H'},
  {position: 20, name: 'Milanesa', precio: 10.00, symbol: 'M'},
];
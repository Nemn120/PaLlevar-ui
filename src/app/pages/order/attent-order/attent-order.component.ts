import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AttendOrderDetailComponent } from '../attend-order-detail/attend-order-detail.component';
//import { OrderService } from '../../../_service/order.service';
//import { MatSnackBar } from '@angular/material/snack-bar';
//import { MatTableDataSource } from '@angular/material/table';
//import { OrderBean } from '../../../_model/OrderBean';
//import { MatSort } from '@angular/material/sort';
//import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-attent-order',
  templateUrl: './attent-order.component.html',
  styleUrls: ['./attent-order.component.scss']
})
export class AttentOrderComponent implements OnInit {
  
  displayedColumns: string[] = ['position', 'name', 'precio', 'symbol'];
  dataSource = ELEMENT_DATA;
  //dataSource: MatTableDataSource<ProductBean>;/// tabla 
  //titleOrderList: string;
  
  constructor(
    private dialog: MatDialog,
    //private orderService:OrderService, private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    //this.titleOrderList="Listar Ordenes";
   // this.orderService.mensajeCambio.subscribe(data => { // cuando actuqalizas o creas se muestra una notificacion
      //this.snackBar.open(data, 'INFO', {
        //duration: 2000
     // });

     //this.orderService.orderCambio.subscribe(data => {
      //this.dataSource = new MatTableDataSource(data);
      //this.dataSource.paginator = this.paginator;
      //this.dataSource.sort = this.sort;
    //});

    
    //this.orderService.getListProductByOrganization().subscribe(data => {  
    
      //console.log(data);
      //this.dataSource = new MatTableDataSource(data);
      //this.dataSource.paginator = this.paginator;
      //this.dataSource.sort = this.sort;
      
    //});
  }
  
  public attendOrder(row :PeriodicElement){
 
    this.dialog.open(AttendOrderDetailComponent, {
      width: '600px',
      data: row
    });
  }
  //public openDialog(product: OrderBean) {
    //let productSelect = product != null ? product : new OrderBean();
    //this.dialog.open(AttendOrderDetailComponent, {
      //width: '600',
      //height: '600',
      //data: productSelect
    //});
  //}
     
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


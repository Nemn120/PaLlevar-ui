import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../../../_service/order.service';
import { OrderBean } from 'src/app/_model/OrderBean';
import { throwMatDialogContentAlreadyAttachedError, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { DetallePedidoComponent } from '../detalle-pedido/detalle-pedido.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogoConfirmacionComponent } from '../../../../_shared/dialogo-confirmacion/dialogo-confirmacion.component';
import { Message } from '../../../../_DTO/messageDTO';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  ord: OrderBean[];
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['companyName', 'date', 'total', 'quantity', 'status', 'detail'];
  dataSource: MatTableDataSource<OrderBean>;/// tabla 


  constructor(
    private orderService: OrderService, private dialog: MatDialog,private snackBar: MatSnackBar,
    
    
  ) { }

  ngOnInit(): void {
    this.orderService.getListOrderByUserId().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.data=this.ord;
    })
  }

  public openDialog(order: OrderBean) {
    let ord = order != null ? order : new OrderBean();
    this.dialog.open(DetallePedidoComponent, {
      width: '750px',
      data: ord
    });
  }

  cancelOrder(order: OrderBean) : void{
  
    let ms = new Message();
    ms.title='Cancelar Pedido'; 
    ms.description = '¿Desea cancelar el pedido seleccionado?';
    
    this.dialog
      .open(DialogoConfirmacionComponent, {
        data: ms
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado){
          
          this.orderService.cancelOrder(order).subscribe(data => {
            //this.orderService.getListOrderPendding().subscribe(data => {
              //this.orderService.orderCambio.next(data);
             
            //});
            this.snackBar.open(data.message,'SUCESS', { duration: 5000 });
          });
          }
          setTimeout (x=>{
            this.dialog.closeAll();
          },2000);
  });
}


}

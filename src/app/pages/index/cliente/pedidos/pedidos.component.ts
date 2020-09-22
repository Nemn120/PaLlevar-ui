import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../../../_service/order.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { DetallePedidoComponent } from '../detalle-pedido/detalle-pedido.component';
import { EnviarMensajeComponent } from '../enviar-mensaje/enviar-mensaje.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogoConfirmacionComponent } from '../../../../_shared/dialogo-confirmacion/dialogo-confirmacion.component';
import { Message } from '../../../../_DTO/messageDTO';
import { DataClientDialogComponent } from '../../../../_shared/data-client-dialog/data-client-dialog.component';
import { OrderBean } from '../../../../_model/OrderBean';
import {ClaimDetailComponent} from '../../../../_shared/claim-detail/claim-detail.component';
import { ComplaintBean } from '../../../../_model/ComplaintBean';
import { ComplaintService } from '../../../../_service/complaint.service';
import { MatFabMenu } from '@angular-material-extensions/fab-menu';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  order: OrderBean[];
  complaint : ComplaintBean[]
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['companyName', 'date', 'total', 'quantity', 'status', 'detail','message'];
  dataSource: MatTableDataSource<OrderBean>;/// tabla 
  dataSource1: MatTableDataSource<ComplaintBean>;
  
 
  constructor(
    private orderService: OrderService, private dialog: MatDialog,private snackBar: MatSnackBar,
    private pedidos: OrderService, private complaintService: ComplaintService
    
  ) { }

  fabButtonsRandom: MatFabMenu[] = [
    {
      id: 1,
      icon: 'create'
    },
    {
      id: 2,
      icon: 'mail'
    },
    {
      id: 3,
      icon: 'file_copy'
    },
    {
      id: 4,
      icon: 'phone'
    },
  ];

  ngOnInit(): void {
    this.pedidos.mensajeCambio.subscribe(data => { 
      this.snackBar.open(data, 'INFO', {
        duration: 2000
      });
    });
   
    this.orderService.getListOrderByUserId().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },error =>{
      this.pedidos.mensajeCambio.next("Error al mostrar");
    });

  

    

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
            this.snackBar.open(data.message,'SUCESS', { duration: 5000 });
          });
          }
          setTimeout (x=>{
            this.dialog.closeAll();
          },2000);
  });
}

public editarPedido(order: OrderBean) {
  let orderSelect = order != null ? order : new OrderBean();
  this.dialog.open(DataClientDialogComponent, {
    data: orderSelect
  });
}
public sendMessage(order: OrderBean) {
  let ord = order != null ? order : new OrderBean();
    

    this.complaintService.getComplaintByOrderId(order.id).subscribe(data => {  
      if (data.data){
        this.dialog.open(ClaimDetailComponent,{
          width: '70%', 
          height: '80%', 
          data: data.data
      });
        
      }
      else
      this.dialog.open(EnviarMensajeComponent, {
          width: '35%', 
          height: '75%',
          data: ord
    });
     
    });
   
 
}
} 

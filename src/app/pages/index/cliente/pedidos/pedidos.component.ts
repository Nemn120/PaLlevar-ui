import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../../../_service/order.service';
import { OrderBean } from 'src/app/_model/OrderBean';
import { throwMatDialogContentAlreadyAttachedError, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { DetallePedidoComponent } from '../detalle-pedido/detalle-pedido.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogoConfirmacionComponent } from '../../../../_shared/dialogo-confirmacion/dialogo-confirmacion.component';
import { Message } from '../../../../_DTO/messageDTO';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  ordenes:OrderBean[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['companyName','date', 'total', 'quantity','status','detail'];
  dataSource: MatTableDataSource<OrderBean>;/// tabla 


  constructor(
    private pedidos: OrderService,private dialog:MatDialog,public dialogo: MatDialog
  ) { }

  ngOnInit(): void {


    this.pedidos.getListOrderByUserId().subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }) 

  }

  public openDialog(order: OrderBean) {
    let ord = order != null ? order : new OrderBean();
    this.dialog.open(DetallePedidoComponent, {
      width: '750px',
      //height: '600',
      data: ord
    });
  }
  cancelarPedido() : void{
    let ms = new Message();
    ms.title='Cancelar Pedido'; 
    ms.description = '¿Desea cancelar el pedido seleccionado?';
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: ms
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado){
          console.log("Se elimino el pedido");
          //const numSelected = this.selection.selected;
          //let attendODetail= new Array<OrderDetailBean>();
          //this.selection.selected.forEach(item => {
           //attendODetail.push(item);
          }//);
        
          //this.data.orderDetail=attendODetail;
          //debugger
          /*this.orderService.saveAttendOrder(this.data).subscribe(data =>{
            console.log(attendODetail);
            this.orderDetailList= this.orderDetailList.filter(x => { //ELIMINAR
              return numSelected.indexOf(x) == -1;
            })
            this.dataSource.data=this.orderDetailList;
            this.orderService.getListOrderPendding().subscribe(data =>{ // ACTUALIZA
              this.orderService.orderCambio.next(data); 
            })
          }, error =>{
            console.error(error);
          })
        */
        
  });
}
}

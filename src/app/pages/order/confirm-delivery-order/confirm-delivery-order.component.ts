
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderBean } from 'src/app/_model/OrderBean';
import { OrderService } from 'src/app/_service/order.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderConfirmComponent } from '../../index/order-confirm/order-confirm.component';
import { Message } from '../../../_DTO/messageDTO';
import { DialogoConfirmacionComponent } from 'src/app/_shared/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-confirm-delivery-order',
  templateUrl: './confirm-delivery-order.component.html',
  styleUrls: ['./confirm-delivery-order.component.scss']
})
export class ConfirmDeliveryOrderComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['id', 'status', 'total','quantity','phone','deliveryDate','createDate','actions'];
  dataSource: MatTableDataSource<OrderBean>;
  titleProductList: string;
  orderList:OrderBean[];
  constructor(
    private orderService:OrderService, private dialog:MatDialog, private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.titleProductList="Listar Productos";
    this.orderService.mensajeCambio.subscribe(data => { 
      this.snackBar.open(data, 'INFO', {
        duration: 7000
      });
    });
    
    this.orderService.orderCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.orderService.getListOrderDelivery().subscribe(data => {  
        this.dataSource = new MatTableDataSource(data.dataList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
      },error =>{
        this.orderService.mensajeCambio.next("Error al mostrar productos");
      });
  
  }

  public openDialogDetail(order: OrderBean) {
    let orderSelect = order != null ? order : new OrderBean();
    this.dialog.open(OrderConfirmComponent, {
      width: '600px',
      data: orderSelect
    });
  }

  public confirmDeliveryOrder(order: OrderBean) {
    let ms = new Message();
    ms.title = 'Confirmar entrega';
    ms.description = '¿Desea confirmar entrega de la orden?';
    this.dialog
      .open(DialogoConfirmacionComponent, {
        data: ms
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.orderService.saveConfirmDeliveryOrder(order).subscribe(data => {
            this.orderService.getListOrderDelivery().subscribe(data2 => {  
              this.orderService.orderCambio.next(data2.dataList);
            this.orderService.mensajeCambio.next(data.message);
            });
          });
        } else {
          this.dialog.closeAll();
        }
      });
  }
}

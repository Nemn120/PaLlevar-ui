import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AttendOrderDetailComponent } from '../attend-order-detail/attend-order-detail.component';
import { OrderService } from '../../../_service/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { OrderBean } from '../../../_model/OrderBean';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-attent-order',
  templateUrl: './attent-order.component.html',
  styleUrls: ['./attent-order.component.scss']
})
export class AttentOrderComponent implements OnInit {
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['createDate', 'address', 'quantity','total'];
  dataSource: MatTableDataSource<OrderBean>;/// tabla 
  titleorderList: string;
  constructor(
    private orderService:OrderService, private dialog:MatDialog, private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Items por pagina';
    this.titleorderList="Listar ordenes";
    this.orderService.mensajeCambio.subscribe(data => { // cuando actuqalizas o creas se muestra una notificacion
      this.snackBar.open(data, 'INFO', {
        duration: 2000
      });
    });

    this.orderService.orderCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.orderService.getListOrderPendding().subscribe(data => {  
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },error =>{
      console.error(error);
      this.orderService.mensajeCambio.next("Error al mostrar ordenes");
    });

  }
  public openDialog(order: OrderBean) {
    let orderSelect = order != null ? order : new OrderBean();
    let height:any;
    if(order.orderDetail.length){
      height=50*order.orderDetail.length + 150;
      height=height.toString();
      height=height+'px';
    }
      this.dialog.open(AttendOrderDetailComponent, {
        width: '600px',
        data: orderSelect
      });
  }
  
     
  }



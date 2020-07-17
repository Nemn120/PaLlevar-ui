import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../../../_service/order.service';
import { OrderBean } from 'src/app/_model/OrderBean';
import { throwMatDialogContentAlreadyAttachedError, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { DetallePedidoComponent } from '../detalle-pedido/detalle-pedido.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  ordenes:OrderBean[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['date', 'total', 'quantity','status','detail'];
  dataSource: MatTableDataSource<OrderBean>;/// tabla 


  constructor(
    private pedidos: OrderService,private dialog:MatDialog
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

}

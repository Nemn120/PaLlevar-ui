import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { OrderBean } from '../../../../_model/OrderBean';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderDetailBean } from '../../../../_model/OrderDetailBean';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.scss']
})
export class DetallePedidoComponent implements OnInit {
  orderDetail :OrderDetailBean[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  
  dataSource: MatTableDataSource<OrderDetailBean>;/// tabla 
  titleOrderDetailList: string;
  displayedColumns: string[] = [ 'companyName','product','price','status'];
  constructor(
    private dialogRef: MatDialogRef<DetallePedidoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderBean,
  ) { }

  ngOnInit(): void {
    this.orderDetail=this.data.orderDetail;
    this.dataSource = new MatTableDataSource<OrderDetailBean>(this.orderDetail);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  closeDialog() {
    this.dialogRef.close();
  }

}

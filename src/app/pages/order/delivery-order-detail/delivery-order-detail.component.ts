
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { OrderDetailBean } from 'src/app/_model/OrderDetailBean';
import { OrderBean } from '../../../_model/OrderBean';
import { OrderDetailService } from '../../../_service/order-detail.service';

@Component({
  selector: 'app-delivery-order-detail',
  templateUrl: './delivery-order-detail.component.html',
  styleUrls: ['./delivery-order-detail.component.scss']
})
export class DeliveryOrderDetailComponent implements OnInit {


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  
  dataSource: MatTableDataSource<OrderDetailBean>;/// tabla 
  titleOrderDetailList: string;
  displayedColumns: string[] = ['id', 'product','price','createDate','attendDate'];
  orderDetailList: OrderDetailBean[];
  constructor(
    private dialogRef: MatDialogRef<OrderDetailBean>,private orderDetailService:OrderDetailService, private OrderDetailService : OrderDetailService,private dialog:MatDialog, private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: OrderBean
  ) { }

  ngOnInit(): void {
  //debugger
    this.orderDetailList=this.data.orderDetail;
    this.dataSource = new MatTableDataSource<OrderDetailBean>(this.orderDetailList);
    this.titleOrderDetailList="Detalle de pedido";   
  }
  closeDialog() {
    this.dialogRef.close();
  }


}


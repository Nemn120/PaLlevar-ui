import { Component, OnInit, Inject } from '@angular/core';
import { OrderBean } from 'src/app/_model/OrderBean';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from 'src/app/_service/order.service';
import { MatTableDataSource } from '@angular/material/table';
import { OrderDetailBean } from 'src/app/_model/OrderDetailBean';
import { CarServiceService } from 'src/app/_service/car-service.service';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.scss']
})
export class OrderConfirmComponent implements OnInit {

  displayedColumns = ['name', 'price'];
  orderDetailList: OrderDetailBean[];
  dataSource: MatTableDataSource<OrderDetailBean>;
  nombre: string;
  address: string;
  phone: number;
  titleOrderDetailList: string;
  costoTotal: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: OrderBean, private snackBar: MatSnackBar,
    private orderService:OrderService,private dialogRef: MatDialogRef<OrderDetailBean>, private carService:CarServiceService
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    console.log(this.data.userOrder.nombre);
    this.orderDetailList=this.data.orderDetail;
    this.dataSource = new MatTableDataSource(this.data.orderDetail);;
    this.titleOrderDetailList="Detalle de pedido"; 
    
    
  }

  closeDialog() {
    this.dialogRef.close();
  }
}


import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserBean } from 'src/app/_model/UserBean';
import { UserService } from 'src/app/_service/user.service';
import { OrderBean } from '../../../_model/OrderBean';
import { OrderDetailBean } from 'src/app/_model/OrderDetailBean';

@Component({
  selector: 'app-delivery-order-asign',
  templateUrl: './delivery-order-asign.component.html',
  styleUrls: ['./delivery-order-asign.component.scss']
})
export class DeliveryOrderAsignComponent implements OnInit {

  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource: MatTableDataSource<UserBean>;/// tabla 
  titleProductList: string;
  orderDetailList:OrderDetailBean[];
  constructor(
    private dialogRef: MatDialogRef<UserBean>,private userService:UserService, private dialog:MatDialog, private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: OrderBean
  ) { }

  ngOnInit(): void {
    
    this.orderDetailList=this.data.orderDetail;
    this.userService.getDeliveryUserList().subscribe(data => {  
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    },error =>{
      this.userService.mensajeCambio.next("Error al mostrar productos");
    });
    console.log("ASDASD");

  
  }
  public sendOrder(e : any){

  }

  closeDialog() {
    this.dialogRef.close();
  }



  }
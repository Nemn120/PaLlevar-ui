

import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserBean } from 'src/app/_model/UserBean';
import { UserService } from 'src/app/_service/user.service';
import { OrderBean } from '../../../_model/OrderBean';
import { SelectionModel } from '@angular/cdk/collections';
import { OrderService } from 'src/app/_service/order.service';
import { DialogoConfirmacionComponent } from '../../../_shared/dialogo-confirmacion/dialogo-confirmacion.component';

import Swal from "sweetalert2";
import 'animate.css';

@Component({
  selector: 'app-delivery-order-asign',
  templateUrl: './delivery-order-asign.component.html',
  styleUrls: ['./delivery-order-asign.component.scss']
})
export class DeliveryOrderAsignComponent implements OnInit {


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource: MatTableDataSource<UserBean>;
  titleProductList: string;

  displayedColumns = ['select','nombre','lastName','cellPhone'];
  selection : SelectionModel<UserBean>;
  constructor(
    public dialogo: MatDialog,private dialogRef: MatDialogRef<UserBean>,private orderService:OrderService,private userService:UserService, private dialog:MatDialog, private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: OrderBean
  ) { }

  ngOnInit(): void {

    this.selection = new SelectionModel<UserBean>(true, []);
    this.userService.getDeliveryUserList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    },error =>{
      this.userService.mensajeCambio.next("Error al mostrar productos");
    });

  }
  public sendOrder(e : any){

  }

  closeDialog() {
    this.dialogRef.close();
  }

  asignarPedido() : void{

    Swal.fire({
      title: "¿Desea asignar los pedidos seleccionados?",
      showCancelButton: true,
      confirmButtonText: "Si",
      denyButtonText: `Cancelar`,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.data.userDeliveryId =this.selection.selected[0].id;
          this.orderService.saveDeliveryOrder(this.data).subscribe(data =>{
            this.dataSource.data=  this.dataSource.data.filter(x => {
              return this.selection.selected.indexOf(x) == -1;
            })
           this.orderService.getListOrderAttend().subscribe(data =>{
             this.orderService.orderCambio.next(data);
           })
          })
      }
    })
 }

}

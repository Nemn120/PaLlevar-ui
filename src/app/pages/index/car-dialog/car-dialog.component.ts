import { Component, OnInit } from '@angular/core';
import { CarServiceService } from '../../../_service/car-service.service';
import { SharedService } from '../../../_service/shared.service';
import { OrderDetailBean } from '../../../_model/OrderDetailBean';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MenuDayService } from '../../../_service/menu-day.service';
import { OrderService } from '../../../_service/order.service';
import { LoginService } from '../../../_service/login.service';
import { Router } from '@angular/router';
import { OrderBean } from '../../../_model/OrderBean';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '../../../_shared/dialogo-confirmacion/dialogo-confirmacion.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderConfirmComponent } from '../order-confirm/order-confirm.component';
import { DataClientDialogComponent } from 'src/app/_shared/data-client-dialog/data-client-dialog.component';
import { NotificationService } from '../../../_service/notification.service';

@Component({
  selector: 'app-car-dialog',
  templateUrl: './car-dialog.component.html',
  styleUrls: ['./car-dialog.component.scss']
})
export class CarDialogComponent implements OnInit {

  odList: Array<OrderDetailBean> = new Array<OrderDetailBean>();
  displayedColumns = ['select', 'name', 'price'];
  selection: SelectionModel<OrderDetailBean>;
  dataSource: MatTableDataSource<OrderDetailBean>;
  totalRow: number;
  sendOrderCar: OrderBean;

  constructor(
    public dialog: MatDialogRef<CarDialogComponent>,
    public carService: CarServiceService,
    public sharedService: SharedService,
    public orderService: OrderService,
    public loginService: LoginService,
    private router: Router,
    public dialogo: MatDialog,
    private snackBar: MatSnackBar,

    private notificacionService:NotificationService
  ) { }

  ngOnInit(): void {
    this.odList = this.carService.getItems();
    this.dataSource = new MatTableDataSource(this.odList);
    this.selection = new SelectionModel<OrderDetailBean>(true, []);
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = !!this.dataSource && this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(r => this.selection.select(r));
  }
  closeDialog() {
    this.dialog.close();
  }

  checkboxLabel(row: OrderDetailBean): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  sendOrder() {
    // debugger;
    
    const numSelected = this.selection.selected;
    if (numSelected.length > 0) {
      if (!this.sharedService.userSession){
        this.snackBar.open('Inicie sesión para enviar la orden', 'INFO', { duration: 5000 });
        this.closeDialog();
        this.router.navigate(['auth/login']);
        return;
      }
      if(this.carService.orderHeader.address){
        this.sendOrderConfirm();
      }else{
        this.dialogo
        .open(DataClientDialogComponent, {
          data: new OrderBean()
        })
        .afterClosed()
        .subscribe((confirmado) => {
            if (confirmado){
              this.sendOrderConfirm();
            }     
         
        });
      }
      
    } else {
      //alert('Seleccione algun producto');
      this.notificacionService.openSnackBar('Seleccione como minimo un producto del carrito!');
    }
  }

  sendOrderConfirm(){
    const numSelected = this.selection.selected;
    const params = {
      title: 'Generar pedido',
      description: '¿Desea realizar el pedido?',
      inputData: true
    };
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: params
      })
      .afterClosed()
      .subscribe((confirmado) => {
        if (confirmado) {
              this.sendOrderCar = new OrderBean();
              this.sendOrderCar = this.carService.orderHeader;
              this.sendOrderCar.orderDetail = [];
              numSelected.forEach(x => {
                this.sendOrderCar.orderDetail.push(x);
                this.carService.numberProductSelected--;
              });

              this.sendOrderCar.userOrder = this.sharedService.userSession;
              this.orderService.saveNewOrder(this.sendOrderCar).subscribe(data => {
                this.carService.deleteProductList(numSelected);
                this.odList = this.carService.getItems();
                this.dataSource.data = this.odList;
                this.closeDialog();
                this.dialogo.open(OrderConfirmComponent, {
                  width: '600px',
                  data: data.data
                });
                this.snackBar.open(data.message, 'SUCESS', { duration: 5000 });
              }, error => {
                this.snackBar.open(error.error, 'ERROR', { duration: 5000 });
              });
            this.closeDialog();
          }
        
      });
  }
  deleteProductsSelect() {
    const numSelected = this.selection.selected;
    if (numSelected.length > 0) {
     // if (confirm('¿Desea borrar los productos seleccionados del carrito? ')) {
        this.carService.deleteProductList(numSelected);
        this.odList = this.carService.getItems();
        this.dataSource.data = this.odList;
        numSelected.forEach(x => {this.carService.numberProductSelected--; });
      //}
    } else {
      //alert('Seleccione el producto a eliminar');
      this.notificacionService.openSnackBar('Seleccione como minimo un producto del carrito!');
    }
  }

  public openDialog(orderBean: OrderBean) {
    let order = orderBean != null ? orderBean : new OrderBean();
    this.dialogo.open(DataClientDialogComponent, {
     width: '20%',
    // height: '52%',
    data: order
    });
  }



}

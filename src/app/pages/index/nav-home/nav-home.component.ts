import { SharedService } from './../../../_service/shared.service';
import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { PerfilComponent } from '../cliente/perfil/perfil.component';
import { CarDialogComponent } from '../car-dialog/car-dialog.component';
import { PedidosComponent } from '../cliente/pedidos/pedidos.component';
import { EditarPerfilComponent } from '../cliente/editar-perfil/editar-perfil.component';
import { CarServiceService } from '../../../_service/car-service.service';
import { OrderBean } from '../../../_model/OrderBean';

@Component({
  selector: 'app-nav-home',
  templateUrl: './nav-home.component.html',
  styleUrls: ['./nav-home.component.scss']
})
export class NavHomeComponent implements OnInit {

  logo2 = '../../../../assets/images/motoDelivery.gif';
  logueado = false;

  cantidad: number;
  @Output() totalCarrito = new EventEmitter();

  constructor(public dialog: MatDialog,private sharedService: SharedService,
              public carService: CarServiceService) {
              }

  ngOnInit(): void {

    if (this.sharedService.userSession != null && this.sharedService.getUserIdSession() > 0) {
      this.logueado = true;
    }
    setInterval ( () => {
      this.cantidad = this.getCantidad();
      this.totalCarrito.emit(this.cantidad);
    }, 1000);
  }

  cerrar() {
    this.logueado = false;
    this.carService.orderDetailList = [];
    this.carService.orderHeader = new OrderBean();
  }

  openPerfil() {
     this.dialog.open(PerfilComponent);
  }
  openDialogCar(){
    const count = this.carService.getItems().length || null;
    let height: any;
    if(count){
      height = 50 * count + 205;
      height = height.toString();
      height = height + 'px';
    }

    this.dialog.open(CarDialogComponent, {
        width: '400px',
        height: height || '100px'
      });
  }

  openPedidos() {
    this.dialog.open(PedidosComponent,{
      width: '600px',
    });
 }

 openEditar(){
  this.dialog.open(EditarPerfilComponent);
 }

 getCantidad(): number {
  return this.carService.numberProductSelected;
 }
}

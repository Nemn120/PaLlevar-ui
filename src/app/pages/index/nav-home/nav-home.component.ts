import { SharedService } from './../../../_service/shared.service';
import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { PerfilComponent } from '../cliente/perfil/perfil.component';
import { CarDialogComponent } from '../car-dialog/car-dialog.component';
import { PedidosComponent } from '../cliente/pedidos/pedidos.component';
import { EditarPerfilComponent } from '../cliente/editar-perfil/editar-perfil.component';
import { CarServiceService } from '../../../_service/car-service.service';

import { OrderBean } from '../../../_model/OrderBean';
import { Router } from '@angular/router';
import { UserBean } from 'src/app/_model/UserBean';
import { LoginService } from 'src/app/_service/login.service';

@Component({
  selector: 'app-nav-home',
  templateUrl: './nav-home.component.html',
  styleUrls: ['./nav-home.component.scss']
})
export class NavHomeComponent implements OnInit {

  logo2 = '../../../../assets/images/motoDelivery.gif';
  logueado = false;
  user: UserBean;
  cantidad: number;
  @Output() totalCarrito = new EventEmitter();

  constructor(public dialog: MatDialog,public sharedService: SharedService,
              public carService: CarServiceService, public router: Router, public loginService:LoginService) {
              }

  ngOnInit(): void {

    if (this.sharedService.userSession != null && this.sharedService.getUserIdSession() > 0) {
      this.logueado = true;
    }
    setInterval ( () => {
      this.cantidad = this.getCantidad();
      this.totalCarrito.emit(this.cantidad);
    }, 1000);

    this.user = this.sharedService.userSession;
  }

  cerrar() {
    this.logueado = false;
    this.carService.orderDetailList = [];
    this.sharedService.userSession = undefined;
    this.carService.orderHeader = new OrderBean();
    this.sharedService.userSession=undefined;
    this.carService.orderDetailList=[];
    this.carService.numberProductSelected=0;
    this.carService.orderHeader = new OrderBean();
    this.loginService.cerrarSesion();
  }

  openPerfil() {
     this.dialog.open(PerfilComponent);
  }
  openDialogCar(){
    const count = this.carService.getItems().length || null;
    let height: any;
    if(count){
      height = 50 * count + 225;
      height = height.toString();
      height = height + 'px';
    }

    this.dialog.open(CarDialogComponent, {
        width: '40%',
      });
  }

  openPedidos() {
    this.dialog.open(PedidosComponent,{
      width: '1000px',
    });
 }

 openEditar(){
  this.dialog.open(EditarPerfilComponent);
 }

 getCantidad(): number {
  return this.carService.numberProductSelected;
 }


 showDish(nameDish: string){
    this.router.navigate(['index/dish',nameDish]);
 }

 ocultarSearchBar(){
   document.getElementById('ocultar').style.display="none";
 }

}

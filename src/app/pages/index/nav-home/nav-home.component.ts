import { SharedService } from './../../../_service/shared.service';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { PerfilComponent } from '../cliente/perfil/perfil.component';
import { CarDialogComponent } from '../car-dialog/car-dialog.component';
import { PedidosComponent } from '../cliente/pedidos/pedidos.component';
import { EditarPerfilComponent } from '../cliente/editar-perfil/editar-perfil.component';
import { CarServiceService } from '../../../_service/car-service.service';

@Component({
  selector: 'app-nav-home',
  templateUrl: './nav-home.component.html',
  styleUrls: ['./nav-home.component.scss']
})
export class NavHomeComponent {

  logo1 = "https://www.pngitem.com/pimgs/m/208-2089100_logos-de-comida-para-llevar-hd-png-download.png";
  logo2 = "../../../../assets/images/motoDelivery.gif";


  logueado:boolean=false;

  
  constructor(public dialog: MatDialog,private sharedService:SharedService,
    public carService:CarServiceService) {}

  ngOnInit(): void {

    if(this.sharedService.userSession != null && this.sharedService.getUserIdSession()>0){
      this.logueado=true;
    }
    
  }

  cerrar(){
    this.logueado=false;
  }

  openPerfil() {
     this.dialog.open(PerfilComponent);
  }
  openDialogCar(){
    let count=this.carService.getItems().length || null;
    let height:any;
    if(count){
      height=50*count + 205;
      height=height.toString();
      height=height+'px';
    }
   
      this.dialog.open(CarDialogComponent, {
        width: '400px',
        height: height || '100px'
      });
  }

  openPedidos() {
    this.dialog.open(PedidosComponent);
 }

 openEditar(){
  this.dialog.open(EditarPerfilComponent);
 }

}

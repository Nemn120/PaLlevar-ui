import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { PerfilComponent } from '../cliente/perfil/perfil.component';

@Component({
  selector: 'app-nav-home',
  templateUrl: './nav-home.component.html',
  styleUrls: ['./nav-home.component.scss']
})
export class NavHomeComponent implements OnInit {

  logo1 = "https://www.pngitem.com/pimgs/m/208-2089100_logos-de-comida-para-llevar-hd-png-download.png";
  logo2 = "../../../../assets/images/motoDelivery.gif";


  logueado:boolean=false;

  
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  iniciar(){
    this.logueado=true;
  }

  cerrar(){

    this.logueado=false;
  }

  //abre el perfil del usuario logueado
  openDialog() {
    
      this.dialog.open(PerfilComponent/*, {
     
        data: {
        animal: 'panda'
      }
    }*/
    
    );
  }
}

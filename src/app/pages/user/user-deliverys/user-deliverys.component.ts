import { Component, OnInit, ViewChild } from '@angular/core';
import { UserBean } from '../../../_model/UserBean';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../../../_service/user.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import {UserDeliveryFormComponent} from '../user-delivery-form/user-delivery-form.component';
import { ProfileBean } from '../../../_model/ProfileBean';
import { SharedService } from 'src/app/_service/shared.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-deliverys',
  templateUrl: './user-deliverys.component.html',
  styleUrls: ['./user-deliverys.component.scss']
})
export class UserDeliverysComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['nombre', 'username' , 'employeeCode', 'status', 'actions'];
  estadosRepartidor: string[] = ['TODOS','DISPONIBLE','OCUPADO','EN VACACIONES']; 
  telefono: string;   
  nombre: string; 
  apellidos: string;
  repartidorBuscado: UserBean = new UserBean() ; 
  deliveryMan: UserBean;
  deliveryMen: any;
  profile: ProfileBean;
  userDeliveryList: UserBean[];
  deliveryManSelect: UserBean;

  constructor(private dialog: MatDialog, private router: Router,
              private userService: UserService, private snackBar: MatSnackBar,
              private sanitization: DomSanitizer, public sharedService: SharedService) {
              }

  ngOnInit(): void {
    this.getDeliveryManByFields(); 
   }

  getDeliveryManByFields(){
    if (this.repartidorBuscado.status == 'Todos')
      this.repartidorBuscado.status = undefined;
    this.repartidorBuscado.profile= new ProfileBean();
    this.repartidorBuscado.profile.idProfile=3;
    this.userService.getUserByFields(this.repartidorBuscado).subscribe(data=>{
      this.activatedPhoto(data.dataList);
      this.userDeliveryList = data.dataList;
      this.repartidorBuscado=new UserBean() ;  
    }, error =>{
      this.userService.mensajeCambio.next("Error al mostrar repartidor");
    });
  }

  public setColorStatus(status : string):string{
    switch(status){
      case 'DISPONIBLE': return 'green';
      case 'OCUPADO': return 'red';
      case 'EN VACACIONES': return '#f5dd42';
    }
  }

  changeState(employee: UserBean) {
    this.dialog.open(UserDeliveryFormComponent, {data: employee});
  }

  activatedPhoto(data: any) {
    for ( const m of data) {
      this.userService.getPhotoById(m.id).subscribe(photo => {
        if(photo.size>0){
          const reader = new FileReader();
          reader.readAsDataURL(photo);
          reader.onloadend = () => {
          const base64 = reader.result;
          m._foto = this.setterPhoto(base64);
          m._isFoto = true;
          };
        }
      });
    }
  }

  setterPhoto(data: any) {
    return this.sanitization.bypassSecurityTrustResourceUrl(data);
  }
  


}

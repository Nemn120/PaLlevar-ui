import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { MatVerticalStepper } from '@angular/material/stepper';
import { UserBean } from 'src/app/_model/UserBean';
import { ProfileBean } from 'src/app/_model/ProfileBean';
import { MatDialog,  MatDialogRef,  MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogConfirmacionComponent } from '../dialog-confirmacion/dialog-confirmacion.component';
import { UserService } from 'src/app/_service/user.service';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { ProfileService } from '../../../_service/profile.service';
import { Message } from '../../../_DTO/messageDTO';
import { DialogoConfirmacionComponent } from 'src/app/_shared/dialogo-confirmacion/dialogo-confirmacion.component';
import { UserDeliverysComponent } from '../user-deliverys/user-deliverys.component';



@Component({
  selector: 'app-user-delivery-form',
  templateUrl: './user-delivery-form.component.html',
  styleUrls: ['./user-delivery-form.component.scss']
})
export class UserDeliveryFormComponent implements OnInit {
  dataEmployee: UserBean;
  constructor(
              private dialog: MatDialog,
              private serviceUser: UserService,
              public dialg: MatDialogRef<UserDeliveryFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: UserBean) { }

  ngOnInit(): void {
    this.dataEmployee= new UserBean();
    this.dataEmployee.id = this.data.id;
    this.dataEmployee.status=this.data.status;
    this.dataEmployee.profile = new ProfileBean();
    this.dataEmployee.profile.idProfile=this.data.profile.idProfile;
    this.dataEmployee._isFoto = this.data._isFoto;
    this.dataEmployee._foto = this.data._foto;
    this.dataEmployee.username = this.data.username;
    this.dataEmployee.cellPhone = this.data.cellPhone;
    this.dataEmployee.documentNumber = this.data.documentNumber;
    this.dataEmployee.nombre = this.data.nombre;
    this.dataEmployee.lastName = this.data.lastName;
  }


  CambiarEstadoDeliveryMan(){
    let messageConfirmation = new Message();
    messageConfirmation.title = 'Confirmar cambio de estado';
    messageConfirmation.description = '¿Desea cambiar el estado del repartidor?';
    this.dialog.open(DialogoConfirmacionComponent,{
      data: messageConfirmation
    })
    .afterClosed().subscribe(t=>{
      if(t){
        this.serviceUser.updateStatusDelivery(this.dataEmployee).subscribe(data=>{
          let user = new UserBean();
          user.profile = new ProfileBean();
          user.profile.idProfile = 3
          this.serviceUser.getUserByFields(user).subscribe(data2=>{
            this.serviceUser.userCambio.next(data2.dataList);
            this.serviceUser.mensajeCambio.next(data.message);
          }, error=>{
            this.serviceUser.mensajeCambio.next(error.message);
          })
          this.dialog.closeAll();
        })
      }else{
        this.dialog.closeAll();
      }
    })
  }

  cerrar(){
    this.dialog.closeAll();
  }
  

}

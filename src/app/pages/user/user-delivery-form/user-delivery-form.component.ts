import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { MatVerticalStepper } from '@angular/material/stepper';
import { UserBean } from 'src/app/_model/UserBean';
import { ProfileBean } from 'src/app/_model/ProfileBean';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmacionComponent } from '../dialog-confirmacion/dialog-confirmacion.component';
import { UserService } from 'src/app/_service/user.service';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { ProfileService } from '../../../_service/profile.service';

@Component({
  selector: 'app-user-delivery-form',
  templateUrl: './user-delivery-form.component.html',
  styleUrls: ['./user-delivery-form.component.scss']
})
export class UserDeliveryFormComponent implements OnInit {
  dataEmployee: UserBean;
  @ViewChild('stepper') stepper: MatVerticalStepper;
  estadoSelected: string;
  companyFormGroup: FormGroup;
  mensaje = 'cambio realizado con éxito';
  hide = true;
  constructor(private formBuilder: FormBuilder, private dialog: MatDialog,
    private serviceUser: UserService, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.companyFormGroup = this.formBuilder.group({
      statusCtrl: ['', Validators.required],
    });
  }

  change(): void{
    this.dataEmployee.status = this.estadoSelected;
    this.openConfirmation();
      this.serviceUser.actualizarPerfil(this.dataEmployee).subscribe(data =>{
        this.serviceUser.mensajeCambio.next('Se modificó');
      });
      console.log(this.dataEmployee);
  }

  openConfirmation() {
    const dialogRef = this.dialog.open(DialogConfirmacionComponent, {
      width: '250px', data: this.mensaje
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}

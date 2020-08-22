import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { MatVerticalStepper } from '@angular/material/stepper';
import { UserBean } from 'src/app/_model/UserBean';
import { ProfileBean } from 'src/app/_model/ProfileBean';
import { MatDialog,  MAT_DIALOG_DATA} from '@angular/material/dialog';
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
  dataEmployee = new UserBean();
  @ViewChild('stepper') stepper: MatVerticalStepper;
  estadoSelected: string;
  companyFormGroup: FormGroup;
  mensaje = 'cambio realizado con éxito';
  hide = true;
  constructor(private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private serviceUser: UserService,
              private profileService: ProfileService,
              @Inject(MAT_DIALOG_DATA) public data: UserBean) { }

  ngOnInit(): void {
    this.dataEmployee = this.data;
    this.companyFormGroup = this.formBuilder.group({
      statusCtrl: ['', Validators.required],
    });
  }

  change(): void {
      // this.dataEmployee.status = 'Vacaciones';
      this.openConfirmation();

      // this.serviceUser.updateStatusDelivery(this.dataEmployee).subscribe(data => {
      //   this.serviceUser.mensajeCambio.next('Se modificó');
      // });
      console.log('status' + this.data.status);
  }

  openConfirmation() {
    const dialogRef = this.dialog.open(DialogConfirmacionComponent, {
      width: '250px', data: this.mensaje
    });

    dialogRef.afterClosed().subscribe(result => {
      this.serviceUser.updateStatusDelivery(this.dataEmployee).subscribe(data => {
        this.serviceUser.mensajeCambio.next('Se modificó');
      });
    });
  }

}

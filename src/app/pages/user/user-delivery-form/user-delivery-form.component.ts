import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { MatVerticalStepper } from '@angular/material/stepper';
import { MatDialog,  MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogConfirmacionComponent } from '../dialog-confirmacion/dialog-confirmacion.component';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { ProfileService } from '../../../_service/profile.service';
import { UserBean } from '../../../_model/UserBean';
import { UserService } from '../../../_service/user.service';

@Component({
  selector: 'app-user-delivery-form',
  templateUrl: './user-delivery-form.component.html',
  styleUrls: ['./user-delivery-form.component.scss']
})
export class UserDeliveryFormComponent implements OnInit {
  dataEmployee:UserBean;
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
    this.dataEmployee= new UserBean();
    this.dataEmployee.id = this.data.id;
    this.dataEmployee.status=this.data.status;
    this.dataEmployee.profile.idProfile=this.data.profile.idProfile;
    this.companyFormGroup = this.formBuilder.group({
      statusCtrl: ['', Validators.required],
    });
  }

  change(): void {   
      this.openConfirmation();
      console.log('status' + this.data.status);
  }

  openConfirmation() {
    const dialogRef = this.dialog.open(DialogConfirmacionComponent, {
      width: '250px', data: this.mensaje
    });

    dialogRef.afterClosed().subscribe(result => {
      this.serviceUser.updateStatusDelivery(this.dataEmployee).subscribe(data => {
        this.serviceUser.getListUserDeliveryMan().subscribe(data2 =>{
          this.serviceUser.userCambio.next(data2.dataList);
          this.serviceUser.mensajeCambio.next(data.message);
        }, error => {
          this.serviceUser.mensajeCambio.next(error.message);
        });

      });
      this.dialog.closeAll();
    });
  }

}

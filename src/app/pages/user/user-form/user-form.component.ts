import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { MatVerticalStepper } from '@angular/material/stepper';
import { UserBean } from 'src/app/_model/UserBean';
import { ProfileBean } from 'src/app/_model/ProfileBean';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogConfirmacionComponent } from '../dialog-confirmacion/dialog-confirmacion.component';
import { UserService } from 'src/app/_service/user.service';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { ProfileService } from '../../../_service/profile.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class UserFormComponent implements OnInit {

  personalFormGroup: FormGroup;
  loginFormGroup: FormGroup;
  companyFormGroup: FormGroup;
  date = new FormControl((new Date()).toISOString());
  profileList: Array<ProfileBean>;

  @ViewChild('stepper') stepper: MatVerticalStepper;

  dataEmployee: UserBean = new UserBean();
  dataProfile: ProfileBean = new ProfileBean();
  documentTypeselected: string;
  idProfileSelected: number;
  estadoSelected: string;

  mensaje = 'Registro exitoso';
  hide = true;
  constructor(private formBuilder: FormBuilder, private dialog: MatDialog,
              private serviceUser: UserService, private profileService: ProfileService,
              @Inject(MAT_DIALOG_DATA) public data: UserBean) {}

  ngOnInit(): void {
    this.dataEmployee.profile = this.dataProfile;

    this.profileService.getListProfile().subscribe(data => {
      this.profileList = data;
    });

    this.personalFormGroup = this.formBuilder.group({
        nombreCtrl: ['', Validators.required],
        lastNameCtrl: ['', Validators.required],
        addressCtrl: ['', Validators.required],
        documentTypeIdCtrl: ['', Validators.required],
        documentNumberCtrl: ['', Validators.required],
        cellPhoneCtrl: ['', Validators.required],
        dateBirthCtrl: ['', Validators.required]

      });
    this.loginFormGroup = this.formBuilder.group({
        passwordCtrl: ['', Validators.required],
        usernameCtrl: ['', Validators.required],
      });
    this.companyFormGroup = this.formBuilder.group({
        statusCtrl: ['', Validators.required],
        employeecodeCtrl: ['', Validators.required],
      });



  }

  registrar(): void {
    if(this.data != null) {
      this.dataEmployee.id = this.data.id;
    }
    this.dataEmployee.nombre = this.personalFormGroup.value.nombreCtrl;
    this.dataEmployee.lastName = this.personalFormGroup.value.lastNameCtrl;
    this.dataEmployee.address = this.personalFormGroup.value.addressCtrl;
    this.dataEmployee.documentTypeId = this.documentTypeselected;
    this.dataEmployee.documentNumber = this.personalFormGroup.value.documentNumberCtrl;
    this.dataEmployee.cellPhone = this.personalFormGroup.value.cellPhoneCtrl;
    this.dataEmployee.dateBirth = this.date.value;
    this.dataEmployee.username = this.loginFormGroup.value.usernameCtrl;
    this.dataEmployee.password = this.loginFormGroup.value.passwordCtrl;

    this.dataEmployee.profile.idProfile = this.idProfileSelected;
    this.dataEmployee.status = this.estadoSelected;
    this.dataEmployee.employeeCode = this.companyFormGroup.value.employeecodeCtrl;

    if (this.dataEmployee.nombre === '' || this.dataEmployee.lastName === '' ||
      this.dataEmployee.address === '' || this.dataEmployee.password === '' ||
      this.dataEmployee.documentNumber === '' || this.dataEmployee.username === '' ||
      this.dataEmployee.employeeCode === '') {
      alert('Debe completar todos los campos');
    } else {
      this.openConfirmation();
      this.serviceUser.registrarTrabajador(this.dataEmployee).subscribe(data => {
        this.serviceUser.mensajeCambio.next('Se registro');
        this.serviceUser.getListUserByOrganization().subscribe(data => {
          this.serviceUser.userCambio.next(data);
        });
      });

    }
  }

  openConfirmation() {
    const dialogRef = this.dialog.open(DialogConfirmacionComponent, {
      width: '250px', data: this.mensaje
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}

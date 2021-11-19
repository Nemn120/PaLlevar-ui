import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatVerticalStepper } from '@angular/material/stepper';
import { ProfileBean } from 'src/app/_model/ProfileBean';
import { UserBean } from 'src/app/_model/UserBean';
import { ProfileService } from 'src/app/_service/profile.service';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss']
})
export class AdminFormComponent implements OnInit {

  personalFormGroup: FormGroup;
  loginFormGroup: FormGroup;
  companyFormGroup: FormGroup;
  date = new FormControl((new Date()).toISOString());

  @ViewChild('stepper') stepper: MatVerticalStepper;

  dataEmployee: UserBean = new UserBean();
  dataProfile: ProfileBean = new ProfileBean();
  documentTypeselected: string;
  estadoSelected: string;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private serviceUser: UserService,
    private profileService: ProfileService,
    @Inject(MAT_DIALOG_DATA) public data: number) {
      this.dataProfile.idProfile = 2;
      this.dataProfile.name = 'ADMIN_NEG';
    }

  ngOnInit(): void {
    this.dataEmployee.profile = this.dataProfile;
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

  registrarAdmin(): void {

    this.dataEmployee.organizationId = this.data;
    this.dataEmployee.nombre = this.personalFormGroup.value.nombreCtrl;
    this.dataEmployee.lastName = this.personalFormGroup.value.lastNameCtrl;
    this.dataEmployee.address = this.personalFormGroup.value.addressCtrl;
    this.dataEmployee.documentTypeId = this.documentTypeselected;
    this.dataEmployee.documentNumber = this.personalFormGroup.value.documentNumberCtrl;
    this.dataEmployee.cellPhone = this.personalFormGroup.value.cellPhoneCtrl;
    this.dataEmployee.dateBirth = this.date.value;
    this.dataEmployee.username = this.loginFormGroup.value.usernameCtrl;
    this.dataEmployee.password = this.loginFormGroup.value.passwordCtrl;


    this.dataEmployee.status = this.estadoSelected;
    this.dataEmployee.employeeCode = this.companyFormGroup.value.employeecodeCtrl;
    console.log('ADMIN');
    console.log(this.dataEmployee);
    this.serviceUser.registrarAdmin(this.dataEmployee).subscribe(data => {
      console.log('SE REGISTRÓ');
    });
  }
}

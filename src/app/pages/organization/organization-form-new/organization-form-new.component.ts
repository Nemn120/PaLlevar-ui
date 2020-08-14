import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { CompanyBean} from 'src/app/_model/CompanyBean';
import { OrganizationService } from '../../../_service/organization.service';
import { SharedService } from 'src/app/_service/shared.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-organization-form-new',
  templateUrl: './organization-form-new.component.html',
  styleUrls: ['./organization-form-new.component.scss']
})
export class OrganizationFormNewComponent implements OnInit {

  publicFormGroup: FormGroup;
  personalFormGroup: FormGroup;
  businessFormGroup: FormGroup;
  collaboratorsFormGroup: FormGroup;

  labelFile: string;
  selectedFiles: FileList;
  imagenData: any;
  currentFileUpload: File;
  companias: CompanyBean[];
  companySelect: CompanyBean;
  imagenEstado = false;

  email = new FormControl('', [Validators.required, Validators.email]);
  statusSelected: string;
  newCompany: CompanyBean;

  constructor(private formBuilder: FormBuilder,
              private companyService: OrganizationService,
              private dialogRef: MatDialogRef<OrganizationFormNewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CompanyBean,
              private sharedService: SharedService,
              private sanitization: DomSanitizer,) {}

  ngOnInit(): void {
    this.publicFormGroup = this.formBuilder.group({
      nameCtrl: ['', Validators.required],
      descriptionCtrl: ['', Validators.required],
      addressCtrl: ['', Validators.required],
      /* photoCtrl: ['', Validators.required], */

    });
    this.personalFormGroup = this.formBuilder.group({
      rucCtrl: ['', Validators.required],
      businessManCtrl: ['', Validators.required],
      phoneCtrl: ['', Validators.required],
      userAdminCtrl: ['', Validators.required],
      anniversaryDateCtrl: ['', Validators.required],
      createDateCtrl: ['', Validators.required],
      statusCtrl: ['', Validators.required],
      estimatedTimeCtrl: ['', Validators.required],
      qualificationCtrl: ['', Validators.required]


    });
    this.businessFormGroup = this.formBuilder.group({
      businessLineCodeCtrl: ['', Validators.required],
      businessMethodCodeCtrl: ['', Validators.required],
      attencionSchedulleCtrl: ['', Validators.required],
    });
    this.collaboratorsFormGroup = this.formBuilder.group({
      responsiblePaymentNameCtrl: ['', Validators.required],
      responsiblePaymentPhoneCtrl: ['', Validators.required],
    });

    this.companySelect = new CompanyBean();
    if (this.data.id > 0) {
      this.companySelect.id = this.data.id;
      this.companySelect.nombre = this.data.nombre;
      this.companySelect.description = this.data.description;
      this.companySelect.ruc = this.data.ruc;
      this.companySelect.userAdmin = this.data.userAdmin;
      this.companySelect.createDate = this.data.createDate;
      this.companyService.getPhotoById(this.data.id).subscribe(data => {
        if (data.size > 0) {
          this.imagenData = this.convertir(data);
        }
      });
      console.log(this.companySelect);
    }
  }

  public convertir(data: any) {
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onloadend = () => {
      const base64 = reader.result;
      this.sanar(base64);
    }
  }

  public sanar(base64 : any){
    this.imagenData= this.sanitization.bypassSecurityTrustResourceUrl(base64);
    this.imagenEstado=true;
  }

  getErrorMessage(): any{
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  registerCompany(): void {
    this.newCompany = new CompanyBean();
    this.newCompany.nombre = this.publicFormGroup.value.nameCtrl;
    this.newCompany.description = this.publicFormGroup.value.descriptionCtrl;
    this.newCompany.address = this.publicFormGroup.value.addressCtrl;
    if(this.selectedFiles != null) {
      this.currentFileUpload = this.selectedFiles.item(0);
    } else {
      this.currentFileUpload = new File([''], 'blanco');
    }

    this.newCompany._foto = this.currentFileUpload;
    this.newCompany.ruc = this.personalFormGroup.value.rucCtrl;
    this.newCompany.businessName = this.personalFormGroup.value.businessManCtrl;
    this.newCompany.phone = this.personalFormGroup.value.phoneCtrl;
    this.newCompany.userAdmin = this.personalFormGroup.value.userAdminCtrl;
    this.newCompany.anniversaryDate = this.personalFormGroup.value.anniversaryDateCtrl;
    this.newCompany.createDate = this.personalFormGroup.value.createDateCtrl;
    this.newCompany.status = this.statusSelected;
    this.newCompany.estimatedTime = this.personalFormGroup.value.estimatedTimeCtrl;
    this.newCompany.qualification = this.personalFormGroup.value.qualificationCtrl;

    this.newCompany.businessLineCode = this.businessFormGroup.value.businessLineCodeCtrl;
    this.newCompany.paymentMethodCode = this.businessFormGroup.value.businessMethodCodeCtrl;
    this.newCompany.attentionSchedule = this.businessFormGroup.value.attencionSchedulleCtrl;

    this.newCompany.responsiblePaymentName = this.collaboratorsFormGroup.value.responsiblePaymentNameCtrl;
    this.newCompany.responsiblePaymentPhone = this.collaboratorsFormGroup.value.responsiblePaymentPhoneCtrl;
    this.newCompany.responsiblePaymentEmail = this.email.value;

    /* this.companyService.saveCompany(this.newCompany, this.currentFileUpload); */

    this.dialogRef.close();
    console.log(this.newCompany);
  }

  selectFile(e: any) {
    this.labelFile = e.target.files[0].name;
    this.selectedFiles = e.target.files;

  }

}

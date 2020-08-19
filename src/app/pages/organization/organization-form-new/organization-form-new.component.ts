import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
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
  codeSelected: string;
  imagenData: any;
  currentFileUpload: File;
  companias: CompanyBean[];
  companySelect: CompanyBean;
  imagenEstado = false;


  initSchedulle: null;
  endSchedulle: null;

  lineCodes: number[] = [1, 2, 3, 4];

  email = new FormControl('', [Validators.required, Validators.email]);
  statusSelected: string;
  pagoSelected: string;

  constructor(private formBuilder: FormBuilder,
              private companyService: OrganizationService,
              private dialogRef: MatDialogRef<OrganizationFormNewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CompanyBean,
              private sharedService: SharedService,
              private sanitization: DomSanitizer) {}

  ngOnInit(): void {
    this.publicFormGroup = this.formBuilder.group({
      nameCtrl: ['', Validators.required],
      descriptionCtrl: ['', Validators.required],
      addressCtrl: ['', Validators.required],

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
      schedulleInitCtrl: ['', Validators.required],
      schedulleEndCtrl: ['', Validators.required],
      codeCtrl: ['', Validators.required],
    });
    this.collaboratorsFormGroup = this.formBuilder.group({
      responsiblePaymentNameCtrl: ['', Validators.required],
      responsiblePaymentPhoneCtrl: ['', Validators.required],
    });

    this.companySelect = new CompanyBean();
    this.companySelect.userAdmin = this.sharedService.userSession;
    if (this.data.id > 0) {
      this.companySelect.id = this.data.id;
      this.companySelect.nombre = this.data.nombre;
      this.companySelect.ruc = this.data.ruc;
      this.companySelect.businessName = this.data.businessName;
      this.companySelect.description = this.data.description;
      this.companySelect.address = this.data.address;
      this.companySelect.phone = this.data.phone;
      this.companySelect.responsiblePaymentName = this.data.responsiblePaymentName;
      this.companySelect.responsiblePaymentPhone = this.data.responsiblePaymentPhone;
      this.companySelect.responsiblePaymentEmail = this.data.responsiblePaymentEmail;
      this.companySelect.anniversaryDate = this.data.anniversaryDate;
      this.companySelect.createDate = this.data.createDate;
      this.companySelect.userAdmin = this.data.userAdmin;
      this.companyService.getPhotoById(this.data.id).subscribe(data => {
        if (data.size > 0) {
          this.imagenData = this.convertir(data);
        }
      });
      this.companySelect.businessLineCode = this.data.businessLineCode;
      this.companySelect.paymentMethodCode = this.data.paymentMethodCode;
      this.companySelect.status = this.data.status;
      this.companySelect.estimatedTime = this.data.estimatedTime;
      this.companySelect.qualification = this.data.qualification;
      this.companySelect.attentionSchedule = this.data.attentionSchedule;
    }
  }

  public convertir(data: any) {
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onloadend = () => {
      const base64 = reader.result;
      this.sanar(base64);
    };
  }

  public sanar(base64: any){
    this.imagenData = this.sanitization.bypassSecurityTrustResourceUrl(base64);
    this.imagenEstado = true;
  }

  getErrorMessage(): any{
    if (this.email.hasError('required')) {
      return 'mail obligatorio';
    }

    return this.email.hasError('email') ? 'mail no válido' : '';
  }

  registerCompany(): void {
     this.companySelect.attentionSchedule = this.businessFormGroup.value.schedulleInitCtrl.toString() + ' a ' +
      this.businessFormGroup.value.schedulleEndCtrl.toString();
     if ( this.selectedFiles != null ) {
      this.currentFileUpload = this.selectedFiles.item(0);
    } else {
      this.currentFileUpload = new File([''], 'blanco');
    }

     this.companyService.saveCompany(this.companySelect, this.currentFileUpload).subscribe(data => {
      this.companyService.getListCompany().subscribe(data2 => {
        this.companyService.companyCambio.next(data2);

        if (this.companySelect.id) {
          this.companyService.mensajeCambio.next('Se actualizo');
        } else {
          this.companyService.mensajeCambio.next('Se registro');
        }
      });
    }, error => {
      this.companyService.mensajeCambio.next('Eror al actualizar/modificar compañoa');
    });

     console.log(this.companySelect);
     this.dialogRef.close();
  }

  selectFile(e: any) {
    this.labelFile = e.target.files[0].name;
    this.selectedFiles = e.target.files;

  }

  listarOrganizaciones() {
    this.companyService.getListCompany().subscribe(
      data => {
        this.companias = data;
      }
    );
  }

}

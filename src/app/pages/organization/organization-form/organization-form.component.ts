import { Component, OnInit, Inject } from '@angular/core';
import { CompanyBean } from '../../../_model/CompanyBean';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrganizationService } from '../../../_service/organization.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedService } from '../../../_service/shared.service';

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.scss']
})
export class OrganizationFormComponent implements OnInit {

  companySelect: CompanyBean;

  imagenData: any;
  imagenEstado: boolean = false;
  selectedFiles: FileList;
  currentFileUpload: File;
  labelFile: string;
  loadingSpinner:boolean=false;
  companias: CompanyBean[];

  constructor(
    private dialogRef: MatDialogRef<OrganizationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CompanyBean,
    private companyService: OrganizationService,
    private sanitization: DomSanitizer,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.companySelect = new CompanyBean();
    if (this.data.id > 0) {
      this.companySelect.id = this.data.id;
      this.companySelect.nombre = this.data.nombre;
      this.companySelect.description = this.data.description;
      this.companySelect.ruc = this.data.ruc;

      this.companySelect.userAdmin = this.data.userAdmin;
      this.companySelect.createDate = new Date();
      this.companyService.getPhotoById(this.data.id).subscribe(data => {
        if (data.size > 0)
          this.imagenData = this.convertir(data);
      });

    }
  }

  listarOrganizaciones() {
    this.companyService.getListCompany().subscribe(
      data => {
        this.companias = data;
      }
    );
  }

  save() {
    if (this.selectedFiles != null) {
      this.currentFileUpload = this.selectedFiles.item(0);
    } else {
      this.currentFileUpload = new File([""], "blanco");
    }
    this.companyService.saveCompany(this.companySelect, this.currentFileUpload).subscribe(data => {
      this.companyService.getListCompany().subscribe(data2 => {
        this.companyService.companyCambio.next(data2);
      
        if (this.companySelect.id)
          this.companyService.mensajeCambio.next("Se actualizo");
        else
          this.companyService.mensajeCambio.next("Se registro");
      });
    },error =>{
      this.companyService.mensajeCambio.next("Eror al actualizar/modificar compañoa");
    });
    this.closeDialog();
  }
  closeDialog() {
    this.dialogRef.close();
  }
  
  selectFile(e: any) {
    this.labelFile = e.target.files[0].name;
    this.selectedFiles = e.target.files;

  }

  public convertir(data: any) {
    let reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onloadend = () => {
      let base64 = reader.result;      
      this.sanar(base64);
    }
  }

  public sanar(base64 : any){
    this.imagenData= this.sanitization.bypassSecurityTrustResourceUrl(base64);
    this.imagenEstado=true;
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { CompanyBean } from '../../../_model/CompanyBean';
import { MatDialog } from '@angular/material/dialog';
import { OrganizationService } from '../../../_service/organization.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedService } from '../../../_service/shared.service';
import { FormBuilder } from '@angular/forms';
import { EditProtocolsComponent } from '../edit-protocols/edit-protocols.component';
import { OrganizationEditComponent } from '../organization-edit/organization-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MapaEmpresaComponent } from '../../../maps/mapa-empresa/mapa-empresa.component';

@Component({
  selector: 'app-organization-view',
  templateUrl: './organization-view.component.html',
  styleUrls: ['./organization-view.component.scss']
})
export class OrganizationViewComponent implements OnInit {

  panelOpenState = false;
  selectedPanelImages: FileList;
  selectedLogoImages: FileList;
  companySelect: CompanyBean;
  imagePanel: any;
  imageLogo: any;
  constructor(private formBuilder: FormBuilder,
    public companyService: OrganizationService,
    private dialog: MatDialog,
    public sharedService: SharedService,
    private sanitization: DomSanitizer,
    private snackBar: MatSnackBar,
    private dialogMap: MatDialog,
    
  ) { }

  ngOnInit(): void {
    this.companySelect = this.sharedService.getCompanySession();
    this.companySelect._foto = this.sharedService.imagenData;
    this.companyService.companyOneCambio.subscribe(data => {
      if(!data._foto){
        this.imageLogo=this.companySelect._foto;
      }
      this.companySelect = data;
      if(!data._foto)
      this.companySelect._foto=this.imageLogo;
    });
    this.companyService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'INFO', {
        duration: 2000
      });
    });
  }

  editPanelImageOrganization(event: any) {
    let company = new CompanyBean();
    company.id = this.companySelect.id;
    let selectedPanelImages = event.target.files;
    if (selectedPanelImages != null) {
      let currentFileUpload = selectedPanelImages.item(0);
      this.companyService.updatePanelImage(this.companySelect.id, currentFileUpload).subscribe(data => {
        this.companyService.getPanelImageById(data.data.id).subscribe(imageBytes => {
          if (imageBytes.size > 0) {
            let reader = new FileReader();
            reader.readAsDataURL(imageBytes);
            reader.onloadend = () => {
              let base64 = reader.result;
              this.companySelect._panelImage = this.setterPhoto(base64);
            };
          }
        });
      });
    }
  }
  editLogoImageOrganization(event: any) {
    let selectedLogoImages = event.target.files;
    if (selectedLogoImages != null) {
      let company = new CompanyBean();
      company.id = this.companySelect.id;
      let currentFileUpload = selectedLogoImages.item(0);
      this.companyService.updateLogoImage(this.companySelect.id, currentFileUpload).subscribe(data => {
        this.companyService.getPhotoById(data.data.id).subscribe(imageBytes => {
          if (imageBytes.size > 0) {
            let reader = new FileReader();
            reader.readAsDataURL(imageBytes);
            reader.onloadend = () => {
              let base64 = reader.result;
              this.companySelect._foto = this.setterPhoto(base64);
              this.companyService.companyOneCambio.next(this.companySelect);
            };
          }
        });
      });
    }
  }
  setterPhoto(data: any) {
    return this.sanitization.bypassSecurityTrustResourceUrl(data);
  }


  openDialogEditProtocolsOrganization() {
    this.dialog.open(EditProtocolsComponent, {
      data: this.companySelect,
      width: '600px'

    });
  }

  openDialogEditOrganization() {
    this.dialog.open(OrganizationEditComponent, {
      data: this.companySelect
    });

  }

  updatePlace(){
    this.dialogMap.open(MapaEmpresaComponent, {
      data: this.companySelect,
      width: '65%',
      height: '75%',
    });

  }

}

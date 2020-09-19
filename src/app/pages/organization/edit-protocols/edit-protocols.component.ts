import { Component, OnInit, Inject } from '@angular/core';
import { CompanyBean } from '../../../_model/CompanyBean';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrganizationService } from '../../../_service/organization.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PlaceBean } from 'src/app/_model/PlaceBean';

@Component({
  selector: 'app-edit-protocols',
  templateUrl: './edit-protocols.component.html',
  styleUrls: ['./edit-protocols.component.scss']
})
export class EditProtocolsComponent implements OnInit {

  companySelect:CompanyBean;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CompanyBean,
    private dialogRef: MatDialogRef<EditProtocolsComponent>,
    private companyService:OrganizationService,
    private sanitization: DomSanitizer,
    

  ) { }

  ngOnInit(): void {
    if (this.data.id > 0) {
      this.companySelect = new CompanyBean();
      this.companySelect.id = this.data.id;
      this.companySelect.nombre = this.data.nombre;
      this.companySelect.sendProtocol=this.data.sendProtocol;
      this.companySelect.hourAttentionProtocol=this.data.hourAttentionProtocol;
      this.companySelect.additionalInformationProtocol=this.data.additionalInformationProtocol;
      this.companySelect.timeEstimatedProtocol=this.data.timeEstimatedProtocol;
      this.companySelect.phone=this.data.phone;
      this.companySelect.ruc=this.data.ruc;
      this.companySelect.address=this.data.address;
      this.companySelect.estimatedTime=this.data.estimatedTime;
      this.companySelect.businessName=this.data.businessName;
      this.companySelect.description=this.data.description;
      if(this.data.place){
        this.companySelect.place =new PlaceBean();
        this.companySelect.place= this.data.place;
      }
      
    }
  }
  save(){
    this.companyService.updateDataCompany(this.companySelect).subscribe( data =>{
      this.companyService.companyOneCambio.next(data.data);
      this.companyService.mensajeCambio.next(data.message);
      this.closeDialog();
    },error=>{
      this.companyService.mensajeCambio.next(error.error);
      this.closeDialog();
    }); 
  }

  closeDialog(){
    this.dialogRef.close();

  }


}

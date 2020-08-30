import { Component, OnInit, Inject } from '@angular/core';
import { CompanyBean } from '../../../_model/CompanyBean';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrganizationService } from '../../../_service/organization.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedService } from '../../../_service/shared.service';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-organization-view',
  templateUrl: './organization-view.component.html',
  styleUrls: ['./organization-view.component.scss']
})
export class OrganizationViewComponent implements OnInit {


  companySelect: CompanyBean;
  constructor(private formBuilder: FormBuilder,
    private companyService: OrganizationService,
    private sharedService: SharedService,
    private sanitization: DomSanitizer) {}

  ngOnInit(): void {
    this.companySelect=this.sharedService.getCompanySession();
  }

}

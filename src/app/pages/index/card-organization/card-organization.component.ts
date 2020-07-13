import { Component, OnInit, Input } from '@angular/core';
import { CompanyBean } from 'src/app/_model/CompanyBean';
import { OrganizationService } from '../../../_service/organization.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-card-organization',
  templateUrl: './card-organization.component.html',
  styleUrls: ['./card-organization.component.scss']
})
export class CardOrganizationComponent implements OnInit {

  @Input() menuOrg: CompanyBean;

  orgSelect: CompanyBean;
  imgDefault = '../../../../assets/icon-cubiertos.jpg';
  
  constructor(
    private dialog: MatDialog,
    private orgService: OrganizationService
  ) { }


  ngOnInit(): void {
    this.orgSelect = new CompanyBean();
    this.orgSelect = this.menuOrg;
    this.sendCambioOrganization();
  }

  sendCambioOrganization(): void {
    this.orgService.setCompanyCambio(this.orgSelect.id);
  }
}

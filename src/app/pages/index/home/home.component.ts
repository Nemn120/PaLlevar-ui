import { Component, OnInit } from '@angular/core';
import { CompanyBean } from '../../../_model/CompanyBean';
import { OrganizationService } from '../../../_service/organization.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CarServiceService } from 'src/app/_service/car-service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  orgId: string;
  menuOrgList: CompanyBean[];
  param: string;

  mOrg: CompanyBean;

  constructor(
    private companyService: OrganizationService,
    private snackBar: MatSnackBar,
    private sanitization: DomSanitizer,
    private cardService: CarServiceService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.mOrg = new CompanyBean();
    this.getListOrganization();
  }


  getListOrganization() {
    this.companyService.getListCompany().subscribe(data => {
      this.menuOrgList = data;
      this.activatedPhoto();
    }, error => {
      console.log(error);
    });
  }

  activatedPhoto() {
    for(let m of this.menuOrgList) {
      this.companyService.getPhotoById(m.id).subscribe(photo => {
        let reader = new FileReader();
        reader.readAsDataURL(photo);
        reader.onload = () => {
          let base64 = reader.result;
          m._foto = this.setterPhoto(base64);
          m._isFoto = true;
        }
      })
    }
  }

  setterPhoto (data: any) {
    return this.sanitization.bypassSecurityTrustResourceUrl(data);
  }

}

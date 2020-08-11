import { Component, OnInit, Input } from '@angular/core';
import { CompanyBean } from 'src/app/_model/CompanyBean';
import { SharedService } from 'src/app/_service/shared.service';

@Component({
  selector: 'app-header-organization',
  templateUrl: './header-organization.component.html',
  styleUrls: ['./header-organization.component.scss']
})
export class HeaderOrganizationComponent implements OnInit {

  @Input() companySelect: CompanyBean;
  private sharedService:SharedService
  route: any;
  constructor() { }

  ngOnInit(): void {
  }

  redirectTo(path: string) {
    this.route.navigate(['/index/shop/cat',path])
    // this.sharedService.subject.next(path);
    console.log('Redirect Menu');
  }


}

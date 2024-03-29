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

  constructor( public sharedService: SharedService) {
   }

  ngOnInit(): void {
  }

  redirectTo(path: string) {
    this.sharedService.subject.next(path);
  }
}

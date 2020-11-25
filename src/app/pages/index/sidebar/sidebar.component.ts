import { Component, OnInit } from '@angular/core';
import { CompanyBean } from '../../../_model/CompanyBean';
import { Router } from '@angular/router';
import { SharedService } from '../../../_service/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {


  company:CompanyBean;
  constructor(
    private route:Router,
    private sharedService:SharedService
  ) { }

  ngOnInit(): void {
    this.company= new CompanyBean();

  }

  redirectTo(path: string){
    this.sharedService.subject.next(path);
  }

}

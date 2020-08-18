import { UserBean } from '../_model/UserBean';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { CompanyBean } from '../_model/CompanyBean';
@Injectable({
    providedIn: 'root'
  })

export class SharedService{

    userSession: UserBean;
    organizationSelect = new Subject<CompanyBean>();
    subject = new Subject<string>();
    loadingSpinner = new Subject<boolean>();
    loading = false;
    constructor(private http: HttpClient, private router: Router,
                private sanitization: DomSanitizer
      ) {

    }

    public getOrganizationIdByUserSession(){
      return this.userSession.organizationId;
    }
    public getSucursalIdByUserSession(){
      return this.userSession.sucursalId;
    }
    public getUserIdSession(){
      return this.userSession.id;
    }
    public getProfileByUserSession(){
      return this.userSession.profile;
    }

    public getStatusByUserSession(){
      return this.userSession.status;
    }

    public closeSpinner(){
      this.loadingSpinner.next(false);
    }
    public openSpinner(){
      this.loadingSpinner.next(true);
    }
  


}
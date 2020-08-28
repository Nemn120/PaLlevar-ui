import { UserBean } from '../_model/UserBean';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject, Observable } from 'rxjs';
import { CompanyBean } from '../_model/CompanyBean';

@Injectable({
    providedIn: 'root'
  })

export class SharedService{

    userSession: UserBean;
    organizationSelect = new Subject<CompanyBean>();
    companySession:CompanyBean
    subject = new Subject<string>();
    imagenData:any;
    imagenStatus:boolean;
    private categorySubject = new Subject<any>();
    loadingSpinner = new Subject<boolean>();
    loading = false;
    constructor(private http: HttpClient,
                private router: Router,
                private sanitization: DomSanitizer) {
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

    public getCompanySession(){
      return this.companySession;
    }

    // public setCategoryCambio(category: string) {
    //   this.categorySubject.next({ text: category});
    // }
    //
    // public getCategoryCambio(): Observable<string> {
    //   return this.categorySubject.asObservable();
    // }

}

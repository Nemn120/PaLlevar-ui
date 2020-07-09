import { UserBean } from '../_model/UserBean';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { DomSanitizer } from '@angular/platform-browser';
@Injectable({
    providedIn: 'root'
  })

export class SharedService{

    userSession: UserBean;
    
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

    public convertir(data: any) {
      let reader = new FileReader();
      reader.readAsDataURL(data);
      reader.onloadend = () => {
        let base64 = reader.result;      
        this.sanar(base64);
      }
    }
  
    public sanar(base64 : any){
      return  this.sanitization.bypassSecurityTrustResourceUrl(base64);
    }


}
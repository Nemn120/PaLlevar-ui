import { Injectable } from '@angular/core';
import { CompanyBean } from '../_model/CompanyBean';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  
  companyCambio = new Subject<CompanyBean[]>();
  mensajeCambio = new Subject<string>();
  url: string = `${environment.HOST}/company`; 

  company :CompanyBean = new CompanyBean();
  constructor(private http: HttpClient,
    private sharedService:SharedService) {
    }
  getListCompany() {
    return this.http.get<CompanyBean[]>(`${this.url}/glco`);
  }
  getCompanyById(id:number) {
    
    return this.http.get<CompanyBean>(`${this.url}/gcobi/${id}`);
  }

  getListCompanyActive() {

    return this.http.post<CompanyBean[]>(`${this.url}/glcoa`,this.company);
  }
  saveCompany(company : CompanyBean) {
    return this.http.post<CompanyBean>(`${this.url}/sco`,company);
  }

  deleteCompany(id: number) {
    return this.http.delete(`${this.url}/dco/${id}`);
  }
}

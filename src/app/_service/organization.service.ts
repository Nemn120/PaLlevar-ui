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
  getPhotoById(id: number) {
    return this.http.get(`${this.url}/gp/${id}`, {
      responseType: 'blob'
    });
  }

  saveCompany(company : CompanyBean, file?:File) {
    //return this.http.post<CompanyBean>(`${this.url}/sco`,company);
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const productBlob = new Blob([JSON.stringify(company)], { type: "application/json" });
    formdata.append('company', productBlob);
    return this.http.post<CompanyBean>(`${this.url}/sco`,formdata);
  }

  deleteCompany(id: number) {
    return this.http.delete(`${this.url}/dco/${id}`);
  }
}

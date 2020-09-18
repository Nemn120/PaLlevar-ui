import { Injectable } from '@angular/core';
import { CompanyBean } from '../_model/CompanyBean';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {


  companyCambio = new Subject<CompanyBean[]>();
  mensajeCambio = new Subject<string>();
  companyOneCambio = new Subject<CompanyBean>();
  id = new Subject<number>();


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

  saveCompany(company : CompanyBean, logoImage?:File,panelImage?:File) {
    /* return this.http.post<CompanyBean>(`${this.url}/sco`,company); */
    let formdata: FormData = new FormData();
    formdata.append('logoImage', logoImage);
    formdata.append('panelImage', panelImage);
    const productBlob = new Blob([JSON.stringify(company)], { type: "application/json" });
    formdata.append('company', productBlob);
    return this.http.post<CompanyBean>(`${this.url}/sco`,formdata);
  }

  updatePanelImage(idCompany : number,panelImage:File) {
    let request ={
      id:idCompany
    }
    let formdata: FormData = new FormData();
    if(panelImage)
    formdata.append('panelImage', panelImage);
    const productBlob = new Blob([JSON.stringify(request)], { type: "application/json" });
    formdata.append('company', productBlob);
    return this.http.post<any>(`${this.url}/upi`,formdata);
  }

  updateLogoImage(idCompany : number, logoImage:File) {
    let request ={
      id:idCompany
    }
    let formdata: FormData = new FormData();
    formdata.append('logoImage', logoImage);
    const productBlob = new Blob([JSON.stringify(request)], { type: "application/json" });
    formdata.append('company', productBlob);
    return this.http.post<any>(`${this.url}/uli`,formdata);
  }


  deleteCompany(id: number) {
    return this.http.delete(`${this.url}/dco/${id}`);
  }

  setCompanyCambio(idCompany: number) {
    this.id.next(idCompany);
  }

  getCompanyCambio(): Observable<number> {
    return this.id.asObservable();
  }

  getPanelImageById(id: number) {
    return this.http.get(`${this.url}/gpi/${id}`, {
      responseType: 'blob'
    });
  }
  updateDataCompany(company:CompanyBean){
    return this.http.post<any>(`${this.url}/udc`,company);

  }
  updateDirectionCompany(company:CompanyBean){
    return this.http.post<any>(`${this.url}/udirc`,company);

  }

  
}

import { Injectable } from '@angular/core';
import { ComplaintBean } from '../_model/ComplaintBean';
import { OrderBean } from '../_model/OrderBean';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SharedService } from './shared.service';
import { OrderService } from './order.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
    
  complaintCambio = new Subject<ComplaintBean[]>();
  mensajeCambio = new Subject<string>();

  complaint: ComplaintBean = new ComplaintBean();
  order: OrderBean = new OrderBean();

  url: string = `${environment.HOST}/complaint`;

  constructor(private http: HttpClient,
    private sharedService: SharedService,
    private orderService: OrderService) {
  }

  getListComplaint() {
    return this.http.get<any>(`${this.url}/glcpt`);
  }

  getPhotoById(id: number) {
    return this.http.get(`${this.url}/gpcpt/${id}`, {
      responseType: 'blob'
    });
  }


  deletedComplaint(id: number) {
    return this.http.delete(`${this.url}/dcpt/${id}`);
  }

  getComplaintById(id: number) {
    return this.http.get<any>(`${this.url}/gcpt/${id}`);
  }

  saveComplaint(complaint : ComplaintBean,file?: File) {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const complaintBlob = new Blob([JSON.stringify(complaint)], { type: "application/json" });
    formdata.append('complaint', complaintBlob);
    return this.http.post<any>(`${this.url}/scpt`,formdata);
  }

  //visualizar reclamos o comentarios

  getListComplaintByOrg() {
    let complaint = new ComplaintBean(); 
    complaint.organizationId = this.sharedService.userSession.organizationId; //getOrganizationIdByUserSession()
    return this.http.post<any>(`${this.url}/glcptbo`,complaint);
  }


}
import { Injectable } from '@angular/core';
import { ComplaintBean } from '../_model/ComplaintBean';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SharedService } from './shared.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
    
  complaintCambio = new Subject<ComplaintBean[]>();
  mensajeCambio = new Subject<string>();

  complaint: ComplaintBean = new ComplaintBean();

  url: string = `${environment.HOST}/complaint`;

  constructor(private http: HttpClient,
    private sharedService: SharedService) {
  }

  getListComplaint() {
    return this.http.get<ComplaintBean[]>(`${this.url}/glcpt`);
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
    return this.http.get<ComplaintBean[]>(`${this.url}/gcpt/${id}`);
  }

  saveComplaint(complaint : ComplaintBean,file?: File) {
    complaint.organizationId = this.sharedService.getOrganizationIdByUserSession();
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const complaintBlob = new Blob([JSON.stringify(complaint)], { type: "application/json" });
    formdata.append('complaint', complaintBlob);
    return this.http.post<ComplaintBean>(`${this.url}/scpt`,complaint);
  }

  //visualizar reclamos o comentarios

  getListComplaintByOrg(complaint: ComplaintBean) {
    this.complaint.organizationId = this.sharedService.getUserIdSession();
    return this.http.post<ComplaintBean>(`${this.url}/glcptbo/${this.complaint.organizationId}`,complaint);
  }


}
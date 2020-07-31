import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { ProfileBean } from '../_model/ProfileBean';
import { SharedService } from './shared.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  profileCambio = new Subject<ProfileBean[]>();
  mensajeCambio = new Subject<string>();
  url: string = `${environment.HOST}/profile`; 
  constructor(private http: HttpClient) { 
  }

  getListProfile() {
    return this.http.get<ProfileBean[]>(`${this.url}/glpnr`);
  }

}

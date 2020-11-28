import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MenuOptionBean } from '../_model/MenuOptionBean';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuOptionService {

  menuCambio : MenuOptionBean[];
  mensajeCambio = new Subject<string>();
  url: string = `${environment.HOST}`;    

  constructor(private http: HttpClient) { }

  listarPorProfileId(id: number) {
    let access_token = sessionStorage.getItem(environment.TOKEN_NAME)
    
    return this.http.get<MenuOptionBean[]>(`${this.url}/menu/glm/${id}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

}

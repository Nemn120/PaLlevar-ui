import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserBean } from '../_model/UserBean';
import { ProfileMenuOptionBean } from '../_model/ProfileMenuOptionBean';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userBeanCambio = new Subject<UserBean[]>();
  mensajeCambio = new Subject<string>();
  menuCambio = new Subject<ProfileMenuOptionBean[]>();
  url: string = `${environment.HOST}`;    
  subUrl:string="user";
  constructor(private http: HttpClient) { }

  listar() {
    let access_token = sessionStorage.getItem(environment.TOKEN_NAME);

    return this.http.get<UserBean[]>(`${this.url}/${this.subUrl}/`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  listarPorUsuario(nombre: string) {
    let access_token = sessionStorage.getItem(environment.TOKEN_NAME)
    
    return this.http.post<UserBean>(`${this.url}/${this.subUrl}/gubu`, nombre, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }
  listMenuByUser(userId:number) {
    let access_token = sessionStorage.getItem(environment.TOKEN_NAME)
    return this.http.get<ProfileMenuOptionBean[]>(`${this.url}/profile/gobp/${userId}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  } 

  listarAll(){
    return this.http.get<UserBean[]>(`${this.url}/${this.subUrl}`);
  }

  listarPorId(id: number) {
    return this.http.get<UserBean>(`${this.url}/${this.subUrl}/${id}`);
  }

  registrar(UserBean: UserBean) {
    return this.http.post(`${this.url}/${this.subUrl}`, UserBean);
  }

  modificar(UserBean: UserBean) {
    return this.http.put(`${this.url}/${this.subUrl}`, UserBean);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${this.subUrl}/${id}`);
  }
}

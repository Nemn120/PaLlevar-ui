import { SharedService } from './shared.service';
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

  userCambio = new Subject<UserBean[]>();
  mensajeCambio = new Subject<string>();
  menuCambio = new Subject<ProfileMenuOptionBean[]>();
  url: string = `${environment.HOST}`;
  subUrl: string = "user";
  imagen: any;
  constructor(private http: HttpClient, private sharedService: SharedService) { }

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
  listMenuByUser(userId: number) {
    let access_token = sessionStorage.getItem(environment.TOKEN_NAME)
    return this.http.get<ProfileMenuOptionBean[]>(`${this.url}/profile/gobp/${userId}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  listarAll() {
    return this.http.get<UserBean[]>(`${this.url}/${this.subUrl}/glur`);
  }
  getListUserByOrganization() {
    let a = this.sharedService.getOrganizationIdByUserSession();
    return this.http.get<UserBean[]>(`${this.url}/${this.subUrl}/gubo/${a}`)
  }
  registrarTrabajador(user: UserBean) {
    user.organizationId = this.sharedService.getOrganizationIdByUserSession();
    return this.http.post<UserBean>(`${this.url}/${this.subUrl}/su`, user);
  }

  getDeliveryUserList() {
    let user = new UserBean;
    user.organizationId = this.sharedService.getOrganizationIdByUserSession();
    return this.http.post<UserBean[]>(`${this.url}/${this.subUrl}/guldm`, user);
  }
  listarPorId(id: number) {
    return this.http.get<UserBean>(`${this.url}/${this.subUrl}/${id}`);
  }

  registrar(UserBean: UserBean) {
    return this.http.post(`${this.url}/${this.subUrl}/rcli`, UserBean);
  }

  getPhotoById(id: number) {
    return this.http.get(`${this.url}/user/gp/${id}`, {
      responseType: 'blob'
    });
  }

  actualizarPerfil(user: UserBean, file?: File) {
    user.id = this.sharedService.userSession.id;
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const productBlob = new Blob([JSON.stringify(user)], { type: "application/json" });
    formdata.append('user', productBlob);
    return this.http.post<any>(`${this.url}/user/uu`,formdata);
  }

  modificar(UserBean: UserBean) {
    return this.http.put(`${this.url}/${this.subUrl}`, UserBean);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${this.subUrl}/${id}`);
  }

  updateStatusDelivery(userbean:UserBean){
    return this.http.post<any>(`${this.url}/${this.subUrl}/usu`, userbean);
  }
}

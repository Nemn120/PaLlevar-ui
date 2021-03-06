
import { Injectable } from '@angular/core';
import { MenuDayBean } from '../_model/MenyDayBean';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class MenuDayService {


  menuDayEditar:MenuDayBean=null;

  menuDayCambio = new Subject<MenuDayBean[]>();
  menuDayOneCambio= new Subject<MenuDayBean>();
  mensajeCambio = new Subject<string>();
  url: string = `${environment.HOST}/menuDay`; 

  constructor(private http: HttpClient,
    private sharedService:SharedService) {
    }

  getMenuDayById(id:number){
    return this.http.get<MenuDayBean>(`${this.url}/gmbi/${id}`);
  }
  getListMenuDay() {
    return this.http.get<MenuDayBean[]>(`${this.url}/glmd`);
  }
  getListMenuDayByOrganization() {
    return this.http.get<MenuDayBean[]>(`${this.url}/glpbo/${this.sharedService.getOrganizationIdByUserSession()}`);
  }

  getListMenuDayByStatusAndOrganization() { 
    let menu =new MenuDayBean();
    menu.organizationId= this.sharedService.getOrganizationIdByUserSession();
    return this.http.post<MenuDayBean[]>(`${this.url}/gmdbso`,menu);
  }
  saveMenuDay(menuDay : MenuDayBean) { 
    menuDay.organizationId = this.sharedService.getOrganizationIdByUserSession();
    return this.http.post<MenuDayBean>(`${this.url}/smd`,menuDay);
  }

  deleteMenuDay(id: number) { 
    return this.http.delete(`${this.url}/dmd/${id}`);
  }
  editMenuDay(menuDay : MenuDayBean) { 
    return this.http.post<MenuDayBean>(`${this.url}/emd`,menuDay);
  }

  getListMenuDayByDay(id:number){
    return this.http.get<any>(`${this.url}/glmdbd/${id}`);
  }


}

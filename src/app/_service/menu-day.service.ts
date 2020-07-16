
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


  menuDayEditar:MenuDayBean=null;//katriel//para poder editarlo en otro componente

  menuDayCambio = new Subject<MenuDayBean[]>();
  mensajeCambio = new Subject<string>();
  url: string = `${environment.HOST}/menuDay`; 

  constructor(private http: HttpClient,
    private sharedService:SharedService) {
    }

  getListMenuDay() {
    return this.http.get<MenuDayBean[]>(`${this.url}/glmd`);
  }
  getListMenuDayByOrganization() { // ESTE LISTAR
    return this.http.get<MenuDayBean[]>(`${this.url}/glpbo/${this.sharedService.getOrganizationIdByUserSession()}`);
  }

  getListMenuDayByStatusAndOrganization() { 
    let menu =new MenuDayBean();
    menu.organizationId= this.sharedService.getOrganizationIdByUserSession();
    return this.http.post<MenuDayBean[]>(`${this.url}/gmdbso`,menu);
  }
  saveMenuDay(menuDay : MenuDayBean) { // S
    menuDay.organizationId = this.sharedService.getOrganizationIdByUserSession();
     console.log(menuDay);
    return this.http.post<MenuDayBean>(`${this.url}/smd`,menuDay);
  }

  deleteMenuDay(id: number) { 
    return this.http.delete(`${this.url}/dmd/${id}`);
  }
  editMenuDay(menuDay : MenuDayBean) { // MENUDAY
    return this.http.post<MenuDayBean>(`${this.url}/emd`,menuDay);
  }


}

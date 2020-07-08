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


  menuDayCambio = new Subject<MenuDayBean[]>();
  mensajeCambio = new Subject<string>();
  url: string = `${environment.HOST}/menuDay`; 

  menuDay :MenuDayBean = new MenuDayBean();
  constructor(private http: HttpClient,
    private sharedService:SharedService) {
      this.menuDay.organizationId = this.sharedService.getOrganizationIdByUserSession();
    }

  getListMenuDay() {
    return this.http.get<MenuDayBean[]>(`${this.url}/glmd`);
  }
  getListMenuDayByOrganization() {
    return this.http.get<MenuDayBean[]>(`${this.url}/glpbo/${this.sharedService.getOrganizationIdByUserSession()}`);
  }

  getListMenuDayByStatusAndOrganization() {
    this.menuDay.organizationId = this.sharedService.getOrganizationIdByUserSession();
    return this.http.post<MenuDayBean[]>(`${this.url}/gmdbso`,this.menuDay);
  }
  saveMenuDay(menuDay : MenuDayBean) {
    menuDay.organizationId = this.sharedService.getOrganizationIdByUserSession();
     console.log(menuDay);
    return this.http.post<MenuDayBean>(`${this.url}/smd`,menuDay);
  }

  deleteMenuDay(id: number) {
    return this.http.delete(`${this.url}/dmd/${id}`);
  }
  editMenuDay(menuDay : MenuDayBean) {
    return this.http.post<MenuDayBean>(`${this.url}/emd`,menuDay);
  }


}

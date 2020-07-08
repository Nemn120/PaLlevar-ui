import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { MenuDayProductBean } from '../_model/menuDayProductBean';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class menuDayProductService {

  menuDayProductCambio = new Subject<MenuDayProductBean[]>();
  mensajeCambio = new Subject<string>();
  url: string = `${environment.HOST}/menuDayProduct`; 

  menuDayProduct :MenuDayProductBean = new MenuDayProductBean();
  constructor(private http: HttpClient,
    private sharedService:SharedService) {
      this.menuDayProduct.organizationId = this.sharedService.getOrganizationIdByUserSession();
    }

  getListMenuDayProduct() {
    return this.http.get<MenuDayProductBean[]>(`${this.url}/glmdp`);
  }

  getListMenuDayProductByMenuIdAndOrganizationId() {
    this.menuDayProduct.organizationId = this.sharedService.getOrganizationIdByUserSession();
    return this.http.post<MenuDayProductBean[]>(`${this.url}/gmdpbmo`,this.menuDayProduct);
  }

  saveMenuDayProduct(menuDayProduct : MenuDayProductBean) {
    menuDayProduct.organizationId = this.sharedService.getOrganizationIdByUserSession();
     console.log(menuDayProduct);
    return this.http.post<MenuDayProductBean>(`${this.url}/smdp`,menuDayProduct);
  }

  deleteMenuDayProduct(id: number) {
    return this.http.delete(`${this.url}/dmdp/${id}`);
  }


}

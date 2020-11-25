import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { MenuDayProductBean } from '../_model/MenuDayProductBean';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';
import { ProductBean } from '../_model/ProductBean';
import { SearchMenuDayProductFavoritesDTO } from '../_DTO/SearchMenuDayProductFavoritesDTO';

@Injectable({
  providedIn: 'root'
})
export class MenuDayProductService {

  menuDayProductCambio = new Subject<MenuDayProductBean[]>();
  mensajeCambio = new Subject<string>();
  url: string = `${environment.HOST}/menuDayProduct`;
  category = 'Menu';
  category2 = 'Favorites';
  constructor(private http: HttpClient,
    private sharedService:SharedService) {
    }

  getListMenuDayProduct() {
    return this.http.get<MenuDayProductBean[]>(`${this.url}/glmdp`);
  }

  saveMenuDayProduct(menuDayProduct : MenuDayProductBean) {
    menuDayProduct.organizationId = this.sharedService.getOrganizationIdByUserSession();
    return this.http.post<any>(`${this.url}/smdp`,menuDayProduct);
  }

  deleteMenuDayProduct(id: number) {
    return this.http.delete(`${this.url}/dmdp/${id}`);
  }

  getListByOrganization(menuDayProduct : MenuDayProductBean){
    return this.http.post<MenuDayProductBean[]>(`${this.url}/glmbod`,menuDayProduct);
  }
  getListByOrganizationAndType(menuDayProduct : MenuDayProductBean){
    return this.http.post<MenuDayProductBean[]>(`${this.url}/glmbot`,menuDayProduct);

  }

  deleteMenuProduct(menuDayProduct:MenuDayProductBean){
    menuDayProduct.organizationId = this.sharedService.getOrganizationIdByUserSession();
    return this.http.post<any>(`${this.url}/dmdp`,menuDayProduct);

  }

  getSearchPlatillos(platillo: string){
    let dish = new MenuDayProductBean;
    dish.product = new ProductBean();
    dish.product.name = platillo;
    return this.http.post<any>(`${this.url}/glsmp`,dish);
  }

  getMenuProductFavorites(favorites: SearchMenuDayProductFavoritesDTO){
    favorites.userId = this.sharedService.getUserIdSession();
    return this.http.post<any>(`${this.url}/glfmpbuao`,favorites)
  }

}

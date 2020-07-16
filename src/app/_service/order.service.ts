import { Injectable } from '@angular/core';
import { OrderBean } from '../_model/OrderBean';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderCambio = new Subject<OrderBean[]>();
  mensajeCambio = new Subject<string>();
  url: string = `${environment.HOST}/order`; 

  order :OrderBean = new OrderBean();
  constructor(private http: HttpClient,
    private sharedService:SharedService) {
    }

  getListOrder() {
    return this.http.get<OrderBean[]>(`${this.url}/glo`);
  }
  getListOrderByOrganization() {
    
    return this.http.get<OrderBean[]>(`${this.url}/glpbo/${this.sharedService.getOrganizationIdByUserSession()}`);
  }

  getListOrderAttend() {
    this.order.organizationId = this.sharedService.getOrganizationIdByUserSession();
    return this.http.post<OrderBean[]>(`${this.url}/gloa`,this.order);
  }

  getListOrderPendding() {
    this.order.organizationId = this.sharedService.getOrganizationIdByUserSession();
    return this.http.post<OrderBean[]>(`${this.url}/glop`,this.order);
  }

  getListOrderDelivery() {
    this.order.organizationId = this.sharedService.getOrganizationIdByUserSession();
    return this.http.post<OrderBean[]>(`${this.url}/glody`,this.order);
  }


  getListOrderByUserId() {
    this.order.organizationId = this.sharedService.getUserIdSession();
    return this.http.get<OrderBean[]>(`${this.url}/globu/${this.order.organizationId}`);
  }

  saveNewOrder(order : OrderBean) {
     console.log(order);
    return this.http.post<OrderBean>(`${this.url}/sobos`,order);
  }
  saveAttendOrder(order : OrderBean) { // IVAN
    order.userAttendId=this.sharedService.getUserIdSession();
    return this.http.post<OrderBean>(`${this.url}/saoo`,order);
  }
  saveDeliveryOrder(order : OrderBean) { //YORDY
    return this.http.post<OrderBean>(`${this.url}/sdoo`,order);
  }


  deleteOrder(id: number) {
    return this.http.delete(`${this.url}/do/${id}`);
  }
}

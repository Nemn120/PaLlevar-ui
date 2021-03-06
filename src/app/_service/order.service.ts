import { Injectable } from '@angular/core';
import { OrderBean } from '../_model/OrderBean';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';
import { SearchOrderByDeliveryManDTO } from '../_DTO/SearchOrderByDeliveryManDTO';
import { SearchOrderByFieldsDTO } from '../_DTO/SearchOrderByFieldsDTO';

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
    return this.http.post<any>(`${this.url}/glody`,this.order);
  }

  getListOrderByUserId() {
    this.order.organizationId = this.sharedService.getUserIdSession();
    return this.http.get<OrderBean[]>(`${this.url}/globu/${this.order.organizationId}`);
  }

  saveNewOrder(order : OrderBean) {
    return this.http.post<any>(`${this.url}/sobos`,order);
  }
  cancelOrder(order:OrderBean){
    return this.http.post<any>(`${this.url}/cor`,order);
  }
  updateOrder(order:OrderBean){
    return this.http.post<any>(`${this.url}/upor`,order);
  }
  
  saveAttendOrder(order : OrderBean) {  
    order.userAttendId=this.sharedService.getUserIdSession();
    return this.http.post<OrderBean>(`${this.url}/saoo`,order);
  }
  saveDeliveryOrder(order : OrderBean) { 
    return this.http.post<OrderBean>(`${this.url}/sdoo`,order);
  }


  deleteOrder(id: number) {
    return this.http.delete(`${this.url}/do/${id}`);
  }

  getAsignOrderByDeliveryMan(searchOrderByDeliveryMan : SearchOrderByDeliveryManDTO){
    return this.http.post<any>(`${this.url}/golbdi`,searchOrderByDeliveryMan);
  }

  getAsignOrderByFields(searchOrderByFieldsDTO : SearchOrderByFieldsDTO){
    return this.http.post<any>(`${this.url}/golbf`,searchOrderByFieldsDTO);
  }

  saveConfirmDeliveryOrder(order: OrderBean){
    return this.http.post<any>(`${this.url}/scdo`,order);
  }



}

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { OrderDetailBean } from '../_model/OrderDetailBean';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';
import { SearchSalesByFieldsDTO } from '../_DTO/SearchSalesByFieldsDTO';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  
  orderDetailCambio = new Subject<OrderDetailBean[]>();
  mensajeCambio = new Subject<string>();
  url: string = `${environment.HOST}/orderDetail`; 

  orderDetail :OrderDetailBean = new OrderDetailBean();
  constructor(private http: HttpClient,
    private sharedService:SharedService) {
      this.orderDetail.organizationId = this.sharedService.getOrganizationIdByUserSession();
    }

  getListOrderDetail() {
    return this.http.get<OrderDetailBean[]>(`${this.url}/glod`);
  }

  getListOrderDetailByOrderId(id:number) { // PENDIENTE DE CORRECCION
    return this.http.get<OrderDetailBean[]>(`${this.url}/glodbo/${this.sharedService.getOrganizationIdByUserSession()}`);
  }

  saveAttendOrderDetail(orderDetail : OrderDetailBean) {
    orderDetail.organizationId = this.sharedService.getOrganizationIdByUserSession();
    return this.http.post<OrderDetailBean>(`${this.url}/sp`,orderDetail);
  }
  saveDeliveryOrderDetail(orderDetail : OrderDetailBean) {
    orderDetail.organizationId = this.sharedService.getOrganizationIdByUserSession();
    return this.http.post<OrderDetailBean>(`${this.url}/sdod`,orderDetail);
  }

  deleteOrderDetail(id: number) {
    return this.http.delete(`${this.url}/dod/${id}`);
  }

  getSalesByFieldsGroupByMenuProduct(searchSales:SearchSalesByFieldsDTO){
    searchSales.organizationId=this.sharedService.getOrganizationIdByUserSession();
    return this.http.post<any>(`${this.url}/gsbfmp`,searchSales)
  }

}

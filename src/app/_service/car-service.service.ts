import { Injectable } from '@angular/core';
import { MenuDayProductBean } from '../_model/MenuDayProductBean';
import { OrderDetailBean } from '../_model/OrderDetailBean';
import { OrderBean } from '../_model/OrderBean';
import { OrderService } from './order.service';

@Injectable({
  providedIn: 'root'
})
export class CarServiceService {

  orderDetailList:Array<OrderDetailBean> = new Array<OrderDetailBean>();
  orderHeader: OrderBean;
  orderService:OrderService;
  constructor() {
    
   }

  addProduct(orderDetail: OrderDetailBean){
    this.orderDetailList.push(orderDetail);
  }
  deleteProduct(id:number){
    this.orderDetailList = this.orderDetailList.filter(x => x.id != id);
  }

  sendOrder(order : OrderBean){
    this.orderHeader = new OrderBean();
    this.orderHeader.address=order.address;
    this.orderHeader.phone=order.phone;
    this.orderHeader.orderDetail=this.orderDetailList;

  }



  getItems(){
    return this.orderDetailList;
  }



}

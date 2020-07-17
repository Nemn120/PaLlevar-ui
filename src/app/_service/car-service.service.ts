import { Injectable } from '@angular/core';
import { MenuDayProductBean } from '../_model/MenuDayProductBean';
import { OrderDetailBean } from '../_model/OrderDetailBean';
import { OrderBean } from '../_model/OrderBean';
import { OrderService } from './order.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarServiceService {

  orderDetailList:Array<OrderDetailBean> = new Array<OrderDetailBean>();
  orderHeader: OrderBean = new OrderBean();
  orderService:OrderService;
  newOrder=new Subject<OrderBean>();

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
    return this.orderHeader;
  }
  getItems(){
    return this.orderDetailList;
  }
  getOrder(){
    return this.orderHeader;
  }
  deleteProductList(orderDetailList: OrderDetailBean[]){
    this.orderDetailList= this.orderDetailList.filter(x => {
      return orderDetailList.indexOf(x) == -1;
    })
  }
  costTotal(){
    let totalCost=0;
    this.orderDetailList.forEach(x =>{
      totalCost+=x.price;
    });
    return totalCost;
  }
  countTotal(){
    return this.orderDetailList.length;
  }

}

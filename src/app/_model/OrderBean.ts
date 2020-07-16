import { UserBean } from './UserBean';
import { OrderDetailBean } from './OrderDetailBean';
import { MainBean } from './MainBean';
export class OrderBean extends MainBean{
     id:number;
     status:string;
     total:number;
     quantity:number;
     userOrder:UserBean;
     phone:String;
     address:String;
     orderDetail:OrderDetailBean[];
     deliveryDate : Date;
     attentDate : Date;
     userAttendId:number;
     userDeliveryId:number;
}
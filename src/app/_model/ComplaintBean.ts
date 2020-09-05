import { MainBean } from './MainBean';
import { OrderBean } from './OrderBean';
export class ComplaintBean extends MainBean{

    id:number;
    localDateTime: Date;
    createDate: Date; 
    titulo:string;
    orderId: OrderBean;
    _foto: any;
    _isFoto: boolean;
    

}
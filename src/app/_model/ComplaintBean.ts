import { MainBean } from './MainBean';
import { OrderBean } from './OrderBean';
export class ComplaintBean extends MainBean{

    id:number;
    createDate: Date; 
    titulo:string;
    description: string;
    orderId: OrderBean;
    _foto: any;
    _isFoto: boolean;
    

}
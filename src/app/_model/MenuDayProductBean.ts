import { ProductBean } from './ProductBean';
import { MenuDayBean } from './MenyDayBean';
export class MenuDayProductBean{
    id:number;
    product:ProductBean;
    menuDay:MenuDayBean;
    price:number;
    quantity:number;
    available:number;
    status:string;
    type:string;

}
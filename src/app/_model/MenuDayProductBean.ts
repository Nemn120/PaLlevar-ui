import { ProductBean } from './ProductBean';
import { MenuDayBean } from './MenyDayBean';
import { MainBean } from './MainBean';
export class MenuDayProductBean extends MainBean{
    id:number;
    product:ProductBean;
    menuDay:MenuDayBean;
    price:number;
    quantity:number;
    available:number;
    status:string;
    type:string;

}
import { MenuDayProductBean } from './MenuDayProductBean';
import { MainBean } from './MainBean';
export class MenuDayBean extends MainBean{
    id:number;
    name:string;
    description:string;  
    day:String; 
    type:string; 
    
    menuDayProductList:MenuDayProductBean[] 
    status:string; 
    localDateTime:Date;
    total:number;
    countTotal:number;
}
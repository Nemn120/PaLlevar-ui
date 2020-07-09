import { MenuDayProductBean } from './MenuDayProductBean';
import { MainBean } from './MainBean';
export class MenuDayBean extends MainBean{
    id:number;
    name:string;
    description:string;
    date:Date;
    day:String;
    type:string;
    menuDayProduct:MenuDayProductBean[]
    

}
import { MenuDayProductBean } from './MenuDayProductBean';
import { MainBean } from './MainBean';
export class MenuDayBean extends MainBean{
    id:number;
    name:string;
    description:string;  // fecha de creacion
    day:String; // LUNES, MARTES ,MIERCOLES DOMINGO
    type:string; // COMBO ,MENU , PAQUETE
    menuDayProduct:MenuDayProductBean[]
    status:string; // ACTIVO O DESACTIVO

}
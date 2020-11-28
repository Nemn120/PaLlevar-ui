import { MainBean } from './MainBean';
export class ComplaintBean extends MainBean{

    id:number;
    titulo:string;
    description: string;
    orderId: number;
    createDate: Date; 
    _foto: any;
    _isFoto: boolean;
    

}
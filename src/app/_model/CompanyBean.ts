import { UserBean } from './UserBean';
export class CompanyBean{
    id:number;
    nombre:string;
    description:string;
    ruc:string;
    createDate:Date;
    userAdmin:UserBean
    estimatedTime:number;
    status:string;
    qualification:number;
    _foto: any;
    _isFoto: boolean;
}
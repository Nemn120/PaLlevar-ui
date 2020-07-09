import { ProfileMenuOptionBean } from './ProfileMenuOptionBean';
import { CategoryProductBean } from './CategoryProductBean';
import { MainBean } from './MainBean';

export class ProductBean extends MainBean{
    id:number;
    name:number;
    description:string;
    categoryProduct:CategoryProductBean;
    _foto: any;
    _isFoto: boolean;
}
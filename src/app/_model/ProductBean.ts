import { ProfileMenuOptionBean } from './ProfileMenuOptionBean';
import { CategoryProductBean } from './CategoryProductBean';
import { MainBean } from './MainBean';

export class ProductBean extends MainBean{
    id:number;
    name:number;
    description:string;
    pathPhoto:string;
    categoryProduct:CategoryProductBean;
}
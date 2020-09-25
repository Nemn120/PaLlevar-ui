import {CompanyBean} from '../_model/CompanyBean';
import {MenuDayProductBean} from '../_model/MenuDayProductBean';

export class CompanyNameAndProductsDTO{
    _organization: CompanyBean;
    _listOfProductsShowed: any;
    _categoryProductName:string;
    _menuProductList:any;
}
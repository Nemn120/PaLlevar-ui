import { Injectable } from '@angular/core';
import { CategoryProductBean } from '../_model/CategoryProductBean';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SharedService } from './shared.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryProductService {

  ompanyCambio = new Subject<CategoryProductBean[]>();
  mensajeCambio = new Subject<string>();
  url: string = `${environment.HOST}/categoryproduct`; 

  CategoryProduct :CategoryProductBean = new CategoryProductBean();
  constructor(private http: HttpClient,
    private sharedService:SharedService) {
    }
  getListCategoryProduct() {
    return this.http.get<CategoryProductBean[]>(`${this.url}/glcp`);
  }
  saveCategoryProduct(CategoryProduct : CategoryProductBean) {
    return this.http.post<CategoryProductBean>(`${this.url}/scp`,CategoryProduct);
  }

  deleteCategoryProduct(id: number) {
    return this.http.delete(`${this.url}/dcp/${id}`);
  }

}

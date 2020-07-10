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
  orgId:number;
  CategoryProduct :CategoryProductBean = new CategoryProductBean();
  constructor(private http: HttpClient,
    private sharedService:SharedService) {
      this.orgId=this.sharedService.getOrganizationIdByUserSession();
    }
  getListCategoryProduct() {
    return this.http.get<CategoryProductBean[]>(`${this.url}/glcp`);
  }
  getListCategoryProductByOrganization() {
    return this.http.get<CategoryProductBean[]>(`${this.url}/glcpbo/${this.orgId}`);
  }


  getPhotoById(id: number) {
    return this.http.get(`${this.url}/gp/${id}`, {
      responseType: 'blob'
    });
  }

  saveCategoryProduct(categoryProduct : CategoryProductBean,file? :File) {
    categoryProduct.organizationId = this.sharedService.getOrganizationIdByUserSession();
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const categoryBlob = new Blob([JSON.stringify(categoryProduct)], { type: "application/json" });
    formdata.append('category', categoryBlob);

    return this.http.post<CategoryProductBean>(`${this.url}/scp`,categoryProduct);
  }

  deleteCategoryProduct(id: number) {
    return this.http.delete(`${this.url}/dcp/${id}`);
  }

}

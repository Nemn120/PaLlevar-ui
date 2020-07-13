import { Injectable } from '@angular/core';
import { ProductBean } from '../_model/ProductBean';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  productCambio = new Subject<ProductBean[]>();
  mensajeCambio = new Subject<string>();
  url: string = `${environment.HOST}/product`; 

  product :ProductBean = new ProductBean();
  constructor(private http: HttpClient,
    private sharedService:SharedService) {
    }

  getListProduct() {
    return this.http.get<ProductBean[]>(`${this.url}/glp`);
  }
  getListProductByOrganization() {
    return this.http.get<ProductBean[]>(`${this.url}/glpbo/${this.sharedService.getOrganizationIdByUserSession()}`);
  }

  getListProductByOrganizationAndSucursal() {
    this.product.organizationId = this.sharedService.getOrganizationIdByUserSession();
    this.product.sucursalId = this.sharedService.getSucursalIdByUserSession();

    return this.http.post<ProductBean[]>(`${this.url}/glpbos`,this.product);
  }
  getPhotoById(id: number) {
    return this.http.get(`${this.url}/gp/${id}`, {
      responseType: 'blob'
    });
  }
  saveProduct(product : ProductBean, file?:File) {
    product.organizationId = this.sharedService.getOrganizationIdByUserSession();
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const productBlob = new Blob([JSON.stringify(product)], { type: "application/json" });
    formdata.append('product', productBlob);
    return this.http.post<ProductBean>(`${this.url}/sp`,formdata);
  }
  

  deleteProduct(id: number) {
    return this.http.delete(`${this.url}/dp/${id}`);
  }
}


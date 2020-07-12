import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductBean } from '../../../_model/ProductBean';
import { ProductService } from '../../../_service/product.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {

  idOrg: number; //id de la organizacion enviado desde card-organization
  products: ProductBean[] = [];

  constructor(private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {

    this.idOrg = this.rutaActiva.snapshot.params.idOrg;
    this.rutaActiva.params.subscribe(
      (params: Params) => this.idOrg = params.idOrg
    );
    this.getProduct();
    //alert(this.idOrg);
  }

  getProduct(){
    
    /*
    this.getProductOrganization(this.idOrg).subscribe(
      data => this.products = data
    );
    */
  }

}

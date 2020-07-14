import { Component, OnInit, Input } from '@angular/core';
import { MenuDayService } from '../../../_service/menu-day.service';
import { MenuDayProductService } from '../../../_service/menu-day-product.service';
import { MenuDayProductBean } from '../../../_model/MenuDayProductBean';
import { ProductService } from '../../../_service/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { OrderDetailBean } from '../../../_model/OrderDetailBean';
import { CarServiceService } from '../../../_service/car-service.service';
import { ActivatedRoute } from '@angular/router';
import { OrganizationService } from '../../../_service/organization.service';
import { CompanyBean } from '../../../_model/CompanyBean';
import { SharedService } from '../../../_service/shared.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {

  orgId: any;
  menuProductList: MenuDayProductBean[];
  param: string;
  companySelect:CompanyBean;
  
  mProduct: MenuDayProductBean;

  constructor(private menuDayService: MenuDayService,
              private menuDayProductService: MenuDayProductService,
              private productService: ProductService,
              private snackBar: MatSnackBar,
              private sanitization: DomSanitizer,
              private cardService: CarServiceService,
              private activatedRoute: ActivatedRoute,
              private organizationService: OrganizationService,
              private sharedService:SharedService
    ) { 
    }

  ngOnInit(): void {

     // this.menuDayService.getListMenuDay().subscribe(data =>{
      this.mProduct  = new MenuDayProductBean();
      //this.mProduct.organizationId = 1; // = new MenuDayProductBean();
        this.param = this.activatedRoute.snapshot.paramMap.get('type'); // params['type'] || null;
        this.orgId = this.activatedRoute.snapshot.paramMap.get('org'); // params['org'] || null;
        this.mProduct.organizationId=parseInt(this.orgId);
        console.log(this.orgId);
        console.log(this.param);
        this.organizationService.getPhotoById(this.mProduct.organizationId).subscribe(data =>{
          if(this.param){
            this.companySelect=this.sharedService.findOrganizatonById(this.mProduct.organizationId);
            this.getListMenuProductByType(this.param);
          }else{
            this.getListMenuProduct();
          }   
        });
      
  }
  getListMenuProduct(){
    this.menuDayProductService.getListByOrganization(this.mProduct).subscribe(data =>{
      this.menuProductList=data;
       this.activatedPhoto();   
     },error =>{
       console.log(error);
     })
  }
  getListMenuProductByType(type : string){
    this.mProduct.type=type;
    this.menuDayProductService.getListByOrganization(this.mProduct).subscribe(data =>{
      this.menuProductList=data;
       this.activatedPhoto();   
     },error =>{
       console.log(error);
     })

  }


  activatedPhoto(){
    for( let m of this.menuProductList){
      this.productService.getPhotoById(m.product.id).subscribe(photo =>{
        let reader = new FileReader();
        reader.readAsDataURL(photo);
        reader.onloadend = () =>{
          let base64 = reader.result;
          m.product._foto = this.setterPhoto(base64);
          m.product._isFoto=true;
        }
      })
    }
  }

  setterPhoto(data : any){
    return this.sanitization.bypassSecurityTrustResourceUrl(data);
  }


}

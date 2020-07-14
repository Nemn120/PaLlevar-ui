import { Component, OnInit, Input } from '@angular/core';
import { MenuDayService } from '../../../_service/menu-day.service';
import { MenuDayProductService } from '../../../_service/menu-day-product.service';
import { MenuDayProductBean } from '../../../_model/MenuDayProductBean';
import { ProductService } from '../../../_service/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { OrderDetailBean } from '../../../_model/OrderDetailBean';
import { CarServiceService } from '../../../_service/car-service.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  imgDefault = '../../../../assets/icon-cubiertos.jpg';
  mProduct: MenuDayProductBean;

  constructor(
              private menuDayProductService: MenuDayProductService,
              private productService: ProductService,
              private sanitization: DomSanitizer,
              private activatedRoute: ActivatedRoute,
              private organizationService: OrganizationService,
              private sharedService:SharedService,
              private router:Router
    ) { 
      
    
    }

  ngOnInit(): void {
      this.mProduct  = new MenuDayProductBean();
      this.companySelect = new CompanyBean();
      this.sharedService.subject.subscribe(data =>{
        this.param=data;
        if(data != null){
          this.mProduct.organizationId=this.companySelect.id;
          this.getListMenuProductByType(this.param);
        }
      });
       this.orgId = this.activatedRoute.snapshot.paramMap.get('org'); 
      if(this.orgId){
        this.organizationService.getCompanyById(this.orgId).subscribe(data =>{
        this.companySelect=data;
        this.mProduct.organizationId=this.companySelect.id;
        this.organizationService.getPhotoById(this.mProduct.organizationId).subscribe(photo =>{
          let reader = new FileReader();
          reader.readAsDataURL(photo);
          reader.onload = () => {
            let base64 = reader.result;
            this.companySelect._foto = this.setterPhoto(base64);
            this.companySelect._isFoto = true;
          }
            this.getListMenuProduct();
             
        });
      })
      }else{
        this.router.navigate(['']); // RUTA REDIRIGIDA AL INICIAR SESION
      }
   
  }
  getListMenuProduct(){
    this.menuProductList=[];
    this.menuDayProductService.getListByOrganization(this.mProduct).subscribe(data =>{
      this.menuProductList=data;
       this.activatedPhoto(data); 
       console.log(this.menuProductList);  
     },error =>{
       console.log(error);
     })
  }
  getListMenuProductByType(type : string){
    this.mProduct.type=type;
    this.menuProductList=[];
    this.menuDayProductService.getListByOrganizationAndType(this.mProduct).subscribe(data =>{
      this.menuProductList=data;
       this.activatedPhoto(data);  
       console.log(this.menuProductList); 
     },error =>{
       console.log(error);
     })
  }


  activatedPhoto(data:any){
    for( let m of data){
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

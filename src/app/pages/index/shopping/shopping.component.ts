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

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {

  orgId:string
  menuProductList: MenuDayProductBean[];
  param:string;
  
  mProduct:MenuDayProductBean;

  constructor(private menuDayService:MenuDayService,
    private menuDayProductService:MenuDayProductService,
    private productService:ProductService,
    private snackBar: MatSnackBar,
    private sanitization: DomSanitizer,
    private cardService: CarServiceService,
    private activatedRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
     //this.menuDayService.getListMenuDay().subscribe(data =>{
       this.mProduct  = new MenuDayProductBean();
      this.mProduct.organizationId=1; // = new MenuDayProductBean();
      this.getListMenuProduct();
      /*this.activatedRoute.queryParams.subscribe(params => {
        this.param = params['type'] || null;
        this.orgId = params['org'] || null;
        console.log(this.orgId);
        this.mProduct.organizationId=parseInt(this.orgId);
        if(this.param){
          this.getListMenuProductByType(this.param);
        }else{
          this.getListMenuProduct();
        }    
        // Código...
      });
      */
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

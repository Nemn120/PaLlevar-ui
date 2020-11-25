import { Component, OnInit} from '@angular/core';
import { MenuDayProductService } from '../../../_service/menu-day-product.service';
import { MenuDayProductBean } from '../../../_model/MenuDayProductBean';
import { ProductService } from '../../../_service/product.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CarServiceService } from '../../../_service/car-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationService } from '../../../_service/organization.service';
import { CompanyBean } from '../../../_model/CompanyBean';
import { SharedService } from '../../../_service/shared.service';
import { OrderBean } from '../../../_model/OrderBean';
import { SearchMenuDayProductFavoritesDTO } from 'src/app/_DTO/SearchMenuDayProductFavoritesDTO';
import { MenuDayService } from 'src/app/_service/menu-day.service';
import { CompanyNameAndProductsDTO } from 'src/app/_DTO/CompanyNameAndProductsDTO';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {

  orgId: any;
  menuProductList: MenuDayProductBean[];
  param: string;
  favoritos: SearchMenuDayProductFavoritesDTO;
  companySelect: CompanyBean;
  imgDefault = '../../../../assets/icon-cubiertos.jpg';
  mProduct: MenuDayProductBean;
  panelOpenState:boolean=false;
  menuByDay:CompanyNameAndProductsDTO[]=[];
  constructor(
              private menuDayProductService: MenuDayProductService,
              private menuDayService: MenuDayService,
              private productService: ProductService,
              private sanitization: DomSanitizer,
              private activatedRoute: ActivatedRoute,
              private organizationService: OrganizationService,
              public sharedService: SharedService,
              private router: Router,
              private carService: CarServiceService
    ) {


    }

  ngOnInit(): void {

    this.mProduct  = new MenuDayProductBean();

    this.companySelect = new CompanyBean();
    this.sharedService.subject.subscribe(data => {
      this.param = data;
      if (data != null) {
        this.mProduct.organizationId = this.companySelect.id;
        if(this.param != 'Favorites'){
          this.getListMenuProductByType(this.param);
        }else{
          this.getListMenuFavoriteProduct();
        }
        
      }
    });
    this.orgId = this.activatedRoute.snapshot.paramMap.get('org');
    if (this.orgId) {
        this.organizationService.getCompanyById(this.orgId).subscribe(data => {
        this.companySelect = data;
        const order = new OrderBean();
        order.organizationId = this.orgId;
        this.carService.orderHeader = order;
        this.mProduct.organizationId = this.companySelect.id;
        this.organizationService.getPhotoById(this.mProduct.organizationId).subscribe(photo => {
          const reader = new FileReader();
          reader.readAsDataURL(photo);
          reader.onload = () => {
            const base64 = reader.result;
            this.companySelect._foto = this.setterPhoto(base64);
          };
          this.getListMenuProduct();
        });
      });
      } else {
        this.router.navigate(['']); 
      }
}
  getListMenuProduct() {
    this.menuProductList = [];
    this.menuDayProductService.getListByOrganization(this.mProduct).subscribe(data => {
      this.menuProductList = data;
      this.activatedPhoto(data);
     }, error => {
       console.error(error);
     });
  }
  getListMenuProductByType(type: string) {
    this.mProduct.type = type;
    this.menuProductList = [];
    this.menuDayProductService.getListByOrganizationAndType(this.mProduct).subscribe(data => {
      this.menuProductList = data;
      this.activatedPhoto(data);
    }, error => {
       console.error(error);
     });
  }

  getListMenuFavoriteProduct(){
    this.menuProductList = [];
    this.favoritos = new SearchMenuDayProductFavoritesDTO();
    this.favoritos.organizationId = this.orgId;
    this.menuDayProductService.getMenuProductFavorites(this.favoritos).subscribe(data => {
      this.menuProductList = data.dataList;
      this.activatedPhoto(data.dataList);
    }, error => {
      console.error(error);
    });
  }
   getListMenuDayByDay(){
    this.menuDayService.getListMenuDayByDay(this.orgId).subscribe(data=>{
      for(var [categoryName, value] of Object.entries(data.dataList)){
        let dto = new CompanyNameAndProductsDTO();
        dto._categoryProductName=categoryName;
        dto._menuProductList = [];
        dto._menuProductList=value;
        this.activatedPhoto(dto._menuProductList);
        this.menuByDay.push(dto);
      } 
    })
    
  }


  activatedPhoto(data: any) {
    for ( const m of data) {
      this.productService.getPhotoById(m.product.id).subscribe(photo => {
        const reader = new FileReader();
        reader.readAsDataURL(photo);
        reader.onloadend = () => {
          const base64 = reader.result;
          m.product._foto = this.setterPhoto(base64);
          m.product._isFoto = true;
        };
        this.sharedService.loading = false;
      });
    }
  }

  setterPhoto(data: any) {
    return this.sanitization.bypassSecurityTrustResourceUrl(data);
  }




}

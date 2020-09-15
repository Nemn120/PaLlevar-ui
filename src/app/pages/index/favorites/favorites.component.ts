import { Component, OnInit } from '@angular/core';
import { MenuDayProductService } from 'src/app/_service/menu-day-product.service';
import { ProductService } from 'src/app/_service/product.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationService } from 'src/app/_service/organization.service';
import { SharedService } from 'src/app/_service/shared.service';
import { CarServiceService } from 'src/app/_service/car-service.service';
import { MenuDayProductBean } from 'src/app/_model/MenuDayProductBean';
import { SearchMenuDayProductFavoritesDTO } from 'src/app/_DTO/SearchMenuDayProductFavoritesDTO';
import { SearchOrderByDeliveryManDTO } from 'src/app/_DTO/SearchOrderByDeliveryManDTO';
import { CompanyBean } from '../../../_model/CompanyBean';
import { OrderBean } from '../../../_model/OrderBean';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  listaFavoritos: MenuDayProductBean[];
  favoritos = new SearchMenuDayProductFavoritesDTO();


  orgId: any;
  menuProductList: MenuDayProductBean[];
  param: string;
  companySelect: CompanyBean;
  imgDefault = '../../../../assets/icon-cubiertos.jpg';
  mProduct: MenuDayProductBean;

  constructor(
    private menuDayProductService: MenuDayProductService,
    private productService: ProductService,
    private sanitization: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private organizationService: OrganizationService,
    public sharedService: SharedService,
    private router: Router,
    private carService: CarServiceService
  ) { }

  /*
  ngOnInit(): void {
    
    this.menuDayProductService.getMenuProductFavorites(this.favoritos).subscribe(data=>{
      this.listaFavoritos = data;
    })
    
  }
  */

  ngOnInit(): void {

    this.mProduct  = new MenuDayProductBean();

    this.companySelect = new CompanyBean();
    this.sharedService.subject.subscribe(data => {
      data = 'Favorites';
      console.log(data);
      this.param = data;
      if (data != null) {
        this.mProduct.organizationId = this.companySelect.id;
        this.getListMenuFavoriteProduct(this.param);
      }
    }
    );
    
    /*
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
        this.router.navigate(['']); // RUTA REDIRIGIDA AL INICIAR SESION
      }
      */
}
  getListMenuProduct() {
    this.menuProductList = [];
    this.menuDayProductService.getListByOrganization(this.mProduct).subscribe(data => {
      this.menuProductList = data;
      this.activatedPhoto(data);
      console.log(this.menuProductList);
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
      console.log( 'TIPO' + this.mProduct.type + this.menuProductList);
    }, error => {
       console.log(error);
     });
  }

  getListMenuFavoriteProduct(type: string){
    this.listaFavoritos = [];
    this.menuDayProductService.getMenuProductFavorites(this.favoritos).subscribe(data => {
      this.listaFavoritos = data;
      this.activatedPhoto(data);
      console.log( 'TIPO' + this.mProduct.type + this.menuProductList);
    }, error => {
      console.log(error);
    });
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

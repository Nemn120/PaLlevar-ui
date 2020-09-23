import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuDayProductService } from 'src/app/_service/menu-day-product.service';
import { MenuDayProductBean } from 'src/app/_model/MenuDayProductBean';
import { ProductService } from 'src/app/_service/product.service';
import { SharedService } from 'src/app/_service/shared.service';
import { DomSanitizer } from '@angular/platform-browser';
import { OrganizationService } from 'src/app/_service/organization.service';
import { CompanyBean } from 'src/app/_model/CompanyBean';
import { CompanyNameAndProductsDTO } from 'src/app/_DTO/CompanyNameAndProductsDTO';
import { ProductBean } from 'src/app/_model/ProductBean';

@Component({
  selector: 'app-search-dish',
  templateUrl: './search-dish.component.html',
  styleUrls: ['./search-dish.component.scss']
})
export class SearchDishComponent implements OnInit {


  listaPlatillos: MenuDayProductBean[] = [];
  platilloBuscado: string;
  listaPlatillosPorEmpresa: MenuDayProductBean[] = [];
  empresas: CompanyBean[];
  compañiaYproducto: CompanyNameAndProductsDTO[];
  listaDTO: CompanyNameAndProductsDTO[] = [];   //////////////////////////////
  xd: any;
  dto: CompanyNameAndProductsDTO[];

  ListaEmpresaConProductos: CompanyNameAndProductsDTO[];



  constructor(
    private _activatedRoute: ActivatedRoute,
    private _menuDayProductService: MenuDayProductService,
    private productService: ProductService,
    public sharedService: SharedService,
    private sanitization: DomSanitizer,
    private _organizationService: OrganizationService) { }

  ngOnInit(): void {
    //this.platilloBuscado = this._activatedRoute.snapshot.params['nameDish'];
    //this._menuDayProductService.getSearchPlatillos(this.platilloBuscado).subscribe(data=>{
    //this.listaPlatillos = data;
    //})
    this._activatedRoute.params.subscribe(params => {
      this.platilloBuscado = params['nameDish'];
      this.ListaEmpresaConProductos = [];
      this._menuDayProductService.getSearchPlatillos(this.platilloBuscado).subscribe(data => {
        console.log(Object.entries(data.dataList));
        for (var [organizationId, value] of Object.entries(data.dataList)) {
          console.log(organizationId);
          this._organizationService.getCompanyById(parseInt(organizationId)).subscribe(data =>{
            for( var [keyProduct, valueProduct] of Object.entries(value)){
              console.log(valueProduct)
            }
          })
          
        }
        
     
    })
  })
}


  activatedPhoto(data: any) {
    for (const m of data) {
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


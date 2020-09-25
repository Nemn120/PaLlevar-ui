import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuDayProductService } from 'src/app/_service/menu-day-product.service';
import { MenuDayProductBean } from 'src/app/_model/MenuDayProductBean';
import { ProductService } from 'src/app/_service/product.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CompanyNameAndProductsDTO } from 'src/app/_DTO/CompanyNameAndProductsDTO';
import { OrganizationService } from 'src/app/_service/organization.service';
import { SharedService } from 'src/app/_service/shared.service';

@Component({
  selector: 'app-search-dish',
  templateUrl: './search-dish.component.html',
  styleUrls: ['./search-dish.component.scss']
})
export class SearchDishComponent implements OnInit {


listaPlatillos: MenuDayProductBean[] = [];
platilloBuscado:string;
listaEmpresaConProductos: CompanyNameAndProductsDTO[];

  constructor(
    private _activatedRoute:ActivatedRoute, 
    private _menuDayProductService:MenuDayProductService, 
    private _productService: ProductService,
    private _organizationService: OrganizationService,
    public _sharedService: SharedService,
    private sanitization: DomSanitizer) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params=>{
      this.platilloBuscado = params['nameDish'];
      this.listaEmpresaConProductos = [];
      this._menuDayProductService.getSearchPlatillos(this.platilloBuscado).subscribe(data=>{
      Object.entries(data.dataList).forEach(element=>{
        this.activatedPhoto(element[1]);
      })
      //console.log(Object.entries(data.dataList));
      for(var [organizationId, value] of Object.entries(data.dataList)){
        let dto = new CompanyNameAndProductsDTO();
        dto._listOfProductsShowed = [];
        for(var [keyProduct, valueProduct] of Object.entries(value)){
          dto._listOfProductsShowed.push(valueProduct);
        }
        this._organizationService.getCompanyById(parseInt(organizationId)).subscribe(company=>{
          dto._organization = company;
          this.listaEmpresaConProductos.push(dto);
        })
      }
      //console.log(this.listaEmpresaConProductos);
      })
    })
  
  }

  activatedPhoto(data:any){
    for(const m of data){
      this._productService.getPhotoById(m.product.id).subscribe(photo=>{
        const reader = new FileReader();
        reader.readAsDataURL(photo);
        reader.onloadend = () =>{
          const base64 = reader.result;
          m.product._foto = this.setterPhoto(base64);
          m.product._isFoto = true;
        };
        this._sharedService.loading = false;
      });
    }
  }

  setterPhoto(data:any){
    return this.sanitization.bypassSecurityTrustResourceUrl(data);
  }
    
}


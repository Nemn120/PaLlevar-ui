import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuDayProductService } from 'src/app/_service/menu-day-product.service';
import { MenuDayProductBean } from 'src/app/_model/MenuDayProductBean';
import { ProductService } from 'src/app/_service/product.service';
import { SharedService } from 'src/app/_service/shared.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-search-dish',
  templateUrl: './search-dish.component.html',
  styleUrls: ['./search-dish.component.scss']
})
export class SearchDishComponent implements OnInit {


listaPlatillos: MenuDayProductBean[] = [];
platilloBuscado:string;



  constructor(
    private _activatedRoute:ActivatedRoute, 
    private _menuDayProductService:MenuDayProductService, 
    private productService: ProductService,
    public sharedService: SharedService,
    private sanitization: DomSanitizer) { }

  ngOnInit(): void {
    //this.platilloBuscado = this._activatedRoute.snapshot.params['nameDish'];
    //this._menuDayProductService.getSearchPlatillos(this.platilloBuscado).subscribe(data=>{
    //this.listaPlatillos = data;
  //})
  
    this._activatedRoute.params.subscribe(params=>{
      this.platilloBuscado=params['nameDish'];
      this._menuDayProductService.getSearchPlatillos(this.platilloBuscado).subscribe(data=>{
        this.activatedPhoto(data);
        this.listaPlatillos= data;
      })
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


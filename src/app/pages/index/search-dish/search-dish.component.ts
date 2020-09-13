import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuDayProductService } from 'src/app/_service/menu-day-product.service';
import { MenuDayProductBean } from 'src/app/_model/MenuDayProductBean';

@Component({
  selector: 'app-search-dish',
  templateUrl: './search-dish.component.html',
  styleUrls: ['./search-dish.component.scss']
})
export class SearchDishComponent implements OnInit {


listaPlatillos: MenuDayProductBean[] = [];
platilloBuscado:string;



  constructor(private _activatedRoute:ActivatedRoute, private _menuDayProductService:MenuDayProductService) { }

  ngOnInit(): void {
    this.platilloBuscado = this._activatedRoute.snapshot.params['nameDish'];
    this._menuDayProductService.getSearchPlatillos(this.platilloBuscado).subscribe(data=>{
    this.listaPlatillos = data;
  })
  
}
    
}


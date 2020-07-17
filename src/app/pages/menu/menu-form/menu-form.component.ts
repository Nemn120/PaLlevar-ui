

import { Component, OnInit } from '@angular/core';

import { MenuDayBean } from '../../../_model/MenyDayBean';
import { MenuDayService } from '../../../_service/menu-day.service';

import { MenuDayProductBean } from '../../../_model/MenuDayProductBean';
import { ProductService } from '../../../_service/product.service';
import { ProductBean } from 'src/app/_model/ProductBean';

//
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


export interface User {
  name: string;
  apellido:string;
}
//
@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.scss']
})
export class MenuFormComponent implements OnInit {

  
    menuDaySelect:MenuDayBean;


  dias: String[] = [
      'Lunes',
     'Martes',
     'Miercoles',
     'Jueves',
     'Viernes',
     'Sabado',
     'Domingo',
  ];
  tipos: String[] = [
    'Menu',
   'Combo',
   'Promocion',
   
];


  estados: string[] = ['Activo', 'Desactivo'];


  productos:ProductBean[];
//
  myControl = new FormControl();
  /*options: User[] = [
    {name: 'Mary',apellido:'uno'},
    {name: 'Shelley',apellido:'dos'},
    {name: 'Igor',apellido:'tres'}
  ];*/

  options:ProductBean[]=[];
  filteredOptions: Observable<ProductBean[]>;
  //

  productSeleccionado:ProductBean;
  
  menuDayProductList:MenuDayProductBean[]=[];
  constructor(
    
    private menuDayService:MenuDayService ,
    private productService:ProductService,
   
  ) { }

  ngOnInit(): void {
    this.listarProductos();

    if(this.menuDayService.menuDayEditar===null){

        this.menuDaySelect=new MenuDayBean();

    }else{
        this.menuDaySelect=this.menuDayService.menuDayEditar;
         this.menuDayService.menuDayEditar=null;
    }

    

//
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
      //
 
  }


 // menuDayProduct:MenuDayProductBean[] // PRODUCTOS , PRECIO, CANTIDAD , ESTADO 
  guardar(){
  

    if(!this.menuDaySelect.id){

      this.menuDaySelect.menuDayProductList=this.menuDayProductList;
    }else{

    }
    this.menuDayService.saveMenuDay(this.menuDaySelect).subscribe(data => {

      console.log('katriel: ',this.menuDaySelect);

      if (this.menuDaySelect.id)
       this.menuDayService.mensajeCambio.next("Se actualizo");
     else
        this.menuDayService.mensajeCambio.next("Se registro");
    }

    );

  }

  
  listarProductos(){
    this.productService.getListProductByOrganization().subscribe(data=>{
     // this.productos=data;
      this.options=data;
     console.log('opciones: ',this.options);
    });
  }

  itemSelected(event: MatAutocompleteSelectedEvent,) {
    console.log("Selected item", event.option.value);
    this.productSeleccionado=event.option.value;
  }
  agregarProduct(){


    
      let nuevoMenuDayProduct:MenuDayProductBean=new MenuDayProductBean();
          nuevoMenuDayProduct.product=this.productSeleccionado;
          this.menuDayProductList.push(nuevoMenuDayProduct);
         
          this.menuDayService.mensajeCambio.next("Se agrrego producto");
        


  }


  //

  displayFn(user: ProductBean): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): ProductBean[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  //
  
}

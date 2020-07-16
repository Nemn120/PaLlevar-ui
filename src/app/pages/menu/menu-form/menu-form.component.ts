
import { SharedService } from './../../../_service/shared.service';
import { Component, OnInit } from '@angular/core';
import { MenuDayBean } from '../../../_model/MenyDayBean';
import { MenuDayService } from '../../../_service/menu-day.service';

import {FormControl, FormGroup} from '@angular/forms';
import { MenuDayProductBean } from '../../../_model/MenuDayProductBean';
import { ProductService } from '../../../_service/product.service';
import { ProductBean } from 'src/app/_model/ProductBean';
import { MenuDayProductService } from '../../../_service/menu-day-product.service';
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
   'Paquete',
   
];


  estados: string[] = ['Activo', 'Desactivo'];


  productos:ProductBean[];
  
  constructor(
    
    private menuDayService:MenuDayService ,

    private menuDayProductService:MenuDayProductService,

    private productService:ProductService,
   
  ) { }

  ngOnInit(): void {

   

    if(this.menuDayService.menuDayEditar===null){

        this.menuDaySelect=new MenuDayBean();



        
      

    }else{
        this.menuDaySelect=this.menuDayService.menuDayEditar;
         this.menuDayService.menuDayEditar=null;
    }

    this.listarProductos();

    
 
  }


 // menuDayProduct:MenuDayProductBean[] // PRODUCTOS , PRECIO, CANTIDAD , ESTADO 
  guardar(){

    let menuDayProductList:MenuDayProductBean[]=[];
    let nuevoMenuDayProduct:MenuDayProductBean=new MenuDayProductBean();
        nuevoMenuDayProduct.product=this.productos[0];
        menuDayProductList.push(nuevoMenuDayProduct);
       


         this.menuDaySelect.menuDayProductList=menuDayProductList;

 

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
      this.productos=data;
      console.log(data);
    });
  }

  agregarMenuDayProduct(){


  }
  
}

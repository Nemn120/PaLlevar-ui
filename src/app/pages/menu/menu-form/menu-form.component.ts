import { SharedService } from './../../../_service/shared.service';
import { Component, OnInit } from '@angular/core';
import { MenuDayBean } from '../../../_model/MenyDayBean';
import { MenuDayService } from '../../../_service/menu-day.service';

import {FormControl, FormGroup} from '@angular/forms';
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


  
  constructor(
    
    private menuDayService:MenuDayService ,

   
  ) { }

  ngOnInit(): void {

    if(this.menuDayService.menuDayEditar===null){

        this.menuDaySelect=new MenuDayBean();

    }else{
        this.menuDaySelect=this.menuDayService.menuDayEditar;
         this.menuDayService.menuDayEditar=null;
    }
 
  }


  guardar(){

    this.menuDayService.saveMenuDay(this.menuDaySelect).subscribe(data => {

      if (this.menuDaySelect.id)
       this.menuDayService.mensajeCambio.next("Se actualizo");
     else
        this.menuDayService.mensajeCambio.next("Se registro");
    }

    );

  }

  





  
}
/*
interface Food {
  value: string;
  viewValue: string;
}*/

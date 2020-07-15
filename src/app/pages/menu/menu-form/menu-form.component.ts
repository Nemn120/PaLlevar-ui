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

  menuDay:MenuDayBean=new MenuDayBean();

  //value = 'Clear me';
  //value2 = 'Clear me';

  selectedValue: string;
  
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

 
  
  constructor(
    
    private menuDayService:MenuDayService ,

    
   
  ) { }

  ngOnInit(): void {
 
  }


  guardar(){

    //this.menuDay.name='Menu 1';
    this.menuDayService.saveMenuDay(this.menuDay).subscribe(data => {

      this.menuDayService.mensajeCambio.next("Se registro");
    }

    );

  }

  





  
}

interface Food {
  value: string;
  viewValue: string;
}

import { Component } from '@angular/core';
import { LoginService } from './_service/login.service';
import { MenuOptionService } from './_service/menu-option.service';
import { MenuOptionBean } from './_model/MenuOptionBean';
import { SharedService } from './_service/shared.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  loadingSpinner:boolean;

  constructor(
    public sharedService:SharedService
    ){

      this.sharedService.loadingSpinner.subscribe(x =>{
        this.loadingSpinner=x;
        console.log(x);
      })
    
     }
  
    ngOnInit(){
      this.sharedService.loadingSpinner.subscribe(x =>{
        this.loadingSpinner=x;
        console.log(x);
      })
        
    }

   
}

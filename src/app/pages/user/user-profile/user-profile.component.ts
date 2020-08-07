import { Component, OnInit } from '@angular/core';
import { UserBean } from '../../../_model/UserBean';
import { UserService } from 'src/app/_service/user.service';
import { SharedService } from 'src/app/_service/shared.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private userService: UserService,
    private sharedService: SharedService,) {
    

   }

  ngOnInit(): void {
    this.obtener_perfil();

  }

  user: UserBean;
  mostrar: boolean = false;
  imagenData: any;
  

  obtener_perfil(){
    this.user = this.sharedService.userSession;
    this.userService.getPhotoById(this.user.id).subscribe(data =>{
      if (data.size > 0){
        this.imagenData = data;
        this.mostrar = true;
      }
    });
  }

  

}

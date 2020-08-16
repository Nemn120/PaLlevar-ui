import { Component, OnInit } from '@angular/core';
import { UserBean } from 'src/app/_model/UserBean';
import { SharedService } from 'src/app/_service/shared.service';
import { UserService } from 'src/app/_service/user.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private sharedService: SharedService,
    private addUserService: UserService,
    private sanitization: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getPerfil();
  }

  getPerfil(){
    this.addUser = this.sharedService.userSession;
    this.addUserService.getPhotoById(this.addUser.id).subscribe(data =>{
      if (data.size > 0){
        this.imageData = this.convertir(data);
        this.toShow=true;
      }
    })
  }

  public convertir(data: any) {
    let reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onloadend = () => {
      let base64 = reader.result;      
      this.sanar(base64);
    }
  }

  public sanar(base64 : any){
    this.imageData= this.sanitization.bypassSecurityTrustResourceUrl(base64);
   
  }

  addUser: UserBean;
  toShow: boolean = false;
  imageData: any;
  
}

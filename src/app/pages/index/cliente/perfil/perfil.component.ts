import { SharedService } from './../../../../_service/shared.service';
import { Component, OnInit } from '@angular/core';
import { UserBean } from '../../../../_model/UserBean';
import { UserService } from '../../../../_service/user.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  user: UserBean;

  mostrar: boolean = false;

  imagenData: any;
  constructor(

    private sharedService: SharedService,
    private userService: UserService,
    private sanitization: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.obtenerPerfil();
  }


  obtenerPerfil() {
    this.user = this.sharedService.userSession;
    this.userService.getPhotoById(this.user.id).subscribe(data => {
      if (data.size > 0) {
        this.imagenData = this.convertir(data);
        this.mostrar = true;
      }
    });
  }



  public convertir(data: any) {
    let reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onloadend = () => {
      let base64 = reader.result;
      this.sanar(base64);
    }
  }
  public sanar(base64: any) {
    this.imagenData = this.sanitization.bypassSecurityTrustResourceUrl(base64);

  }


}

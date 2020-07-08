import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NotificationService } from '../../../_service/notification.service';
import { AuthenticationService } from '../../../_service/auth.service';
import { MenuService } from '../../../_service/menu.service';
import { environment } from '../../../../environments/environment.prod';
import { LoginService } from '../../../_service/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../../../_service/user.service';
import { SharedService } from '../../../_service/shared.service';
import { UserBean } from '../../../_model/UserBean';
import { ProfileMenuOptionBean } from '../../../_model/ProfileMenuOptionBean';
import { MenuOptionBean } from '../../../_model/MenuOptionBean';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading: boolean;
  usuario: string;
  clave: string;
  mensaje: string = "";
  error: string = "";
  logo = "https://www.pngitem.com/pimgs/m/208-2089100_logos-de-comida-para-llevar-hd-png-download.png";
  profileOption: ProfileMenuOptionBean[];
  constructor(private router: Router,
    private titleService: Title,
    private loginService: LoginService,
    private userService: UserService,
    private menuService: MenuService,
    private notificationService: NotificationService,
    private sharedService: SharedService,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.titleService.setTitle('Login paLlevar');
    console.log("LOGINFROM");
    this.createForm();
  }

  private createForm() {
    const savedUserEmail = localStorage.getItem('savedUserEmail');

    this.loginForm = new FormGroup({
      email: new FormControl(savedUserEmail, [Validators.required]),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(savedUserEmail !== null)
    });
  }

  login() {
    console.log(this.loginForm.value);
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((data: any) => {
      console.log(data);
      if (data) {
        
        console.log(data);
        const helper = new JwtHelperService();

        sessionStorage.setItem(environment.TOKEN_NAME, data.access_token);

        const decodedToken = helper.decodeToken(data.access_token);
        console.log(decodedToken);
        console.log(decodedToken.user_name);
        this.userService.listarPorUsuario(decodedToken.user_name).subscribe(data => {
          this.sharedService.userSession = new UserBean; 
          this.sharedService.userSession =data; // guardo el usuario que inicia
          console.log(data);
          this.menuService.listarPorProfileId(this.sharedService.userSession.profile.idProfile).subscribe(data =>{
           this.menuService.menuCambio= data; //
         //this.menuService.menuCambio.next(data); //
            console.log(data);
          
           //   setTimeout(x=>{
                this.router.navigate(['suc/show']); // RUTA REDIRIGIDA AL INICIAR SESION
            //  },1000)
                      });
        });
      }
    });
  }

  resetPassword() {
    this.router.navigate(['/auth/password-reset-request']);
  }

  ngAfterViewInit() {
    (window as any).initialize();
  }

}

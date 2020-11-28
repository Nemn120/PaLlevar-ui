import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { MenuOptionService } from '../../../_service/menu-option.service';
import { environment } from '../../../../environments/environment.prod';
import { LoginService } from '../../../_service/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../../../_service/user.service';
import { SharedService } from '../../../_service/shared.service';
import { UserBean } from '../../../_model/UserBean';
import { ProfileMenuOptionBean } from '../../../_model/ProfileMenuOptionBean';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrganizationService } from '../../../_service/organization.service';

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
    private menuService: MenuOptionService,
    private sharedService: SharedService,
    private companyService: OrganizationService,
    private sanitization: DomSanitizer,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.titleService.setTitle('Login paLlevar');
    this.loginService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'INFO', {
        duration: 2000
      });
    })

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
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((data: any) => {
      if (data) {
        const helper = new JwtHelperService();

        sessionStorage.setItem(environment.TOKEN_NAME, data.access_token);

        const decodedToken = helper.decodeToken(data.access_token);
        this.userService.listarPorUsuario(decodedToken.user_name).subscribe(data => {
          this.sharedService.userSession = new UserBean;
          this.sharedService.userSession = data; 
          this.menuService.listarPorProfileId(this.sharedService.userSession.profile.idProfile).subscribe(data => {
            this.menuService.menuCambio = data; 
            if (this.sharedService.userSession.profile.idProfile === 6) {
              this.router.navigate(['index/shop']);
            } else {
              if (this.sharedService.userSession.profile.idProfile === 1) this.router.navigate(['suc/show']);
              else {
                this.companyService.getCompanyById(this.sharedService.getOrganizationIdByUserSession()).subscribe(data => {
                  this.sharedService.companySession = data;
                  this.companyService.getPhotoById(data.id).subscribe(photo => {
                    if (photo.size > 0) {
                      this.sharedService.imagenData = this.convertir(photo);
                    }
                    this.router.navigate(['suc/show']);
                  })
                })
              }
            }
          });
        }, error => {
          console.error(error);
          this.loginService.mensajeCambio.next("ERROR");
        });
      }
    }, error => {
      console.error(error);
      this.loginService.mensajeCambio.next("El producto que desea eliminar esta siendo usado");
    });
  }

  resetPassword() {
    this.router.navigate(['/auth/password-reset-request']);
  }

  ngAfterViewInit() {
    (window as any).initialize();
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
    this.sharedService.imagenData = this.sanitization.bypassSecurityTrustResourceUrl(base64);
    this.sharedService.imagenStatus = true;
  }


}

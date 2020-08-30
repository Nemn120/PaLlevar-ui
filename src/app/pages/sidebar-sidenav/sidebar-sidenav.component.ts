import { Component, OnInit, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { LoginService } from '../../_service/login.service';
import { MenuOptionService } from '../../_service/menu-option.service';
import { UserService } from '../../_service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MediaMatcher } from '@angular/cdk/layout';
import { SpinnerService } from '../../_service/spinner.service';
import { MenuOptionBean } from '../../_model/MenuOptionBean';
import { UserBean } from '../../_model/UserBean';
import { SharedService } from '../../_service/shared.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {OrderBean} from '../../_model/OrderBean';
import {CarServiceService} from '../../_service/car-service.service';
import {ProfileComponent} from '../sidebar-sidenav/profile/profile.component';
import { Router } from '@angular/router';
import {EditAddProfileComponent} from '../sidebar-sidenav/edit-add-profile/edit-add-profile.component';

@Component({
  selector: 'app-sidebar-sidenav',
  templateUrl: './sidebar-sidenav.component.html',
  styleUrls: ['./sidebar-sidenav.component.scss']
})
export class SidebarSidenavComponent implements OnInit, OnDestroy {
  private _mobileQueryListener: () => void;
  title = 'paLlevar-frontend';
  mobileQuery: MediaQueryList;
  showSpinner: boolean;
  userName: string;
  isAdmin: boolean;
  //menus: Array<MenuOptionBean> = new Array();
  menus:MenuOptionBean[];
  isLogueado: boolean = false;
  userMenu: string;

  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    public loginService: LoginService,
    public carService:CarServiceService,
    private menuService : MenuOptionService,
    private usuarioService:UserService,
    private dialog: MatDialog,
    private media: MediaMatcher,
    public spinnerService: SpinnerService,
    public sharedService:SharedService,

    ){

      this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      // tslint:disable-next-line: deprecation
      this.mobileQuery.addListener(this._mobileQueryListener);
     }
     ngOnInit(){
      if(this.sharedService.userSession != null && this.sharedService.getUserIdSession()>0){
        this.isLogueado=true;
        this.menus= this.menuService.menuCambio;
      }
    }

    openUserPerfil() {
       this.dialog.open(ProfileComponent);
     }

    editPerfil(){
      this.dialog.open(EditAddProfileComponent);
    }

    ngOnDestroy(): void {
      this.mobileQuery.removeListener(this._mobileQueryListener);
      //this.autoLogoutSubscription.unsubscribe();
    }

  cerrarSesion() {
    this.isLogueado = false;
    this.carService.orderDetailList=[];
    this.carService.orderHeader = new OrderBean();
    this.router.navigate(['auth/login']);
    console.log(this.isLogueado);
  }
}

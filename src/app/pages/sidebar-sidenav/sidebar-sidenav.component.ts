import { Component, OnInit, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { LoginService } from '../../_service/login.service';
import { MenuOptionService } from '../../_service/menu-option.service';
import { MatDialog } from '@angular/material/dialog';
import { MediaMatcher } from '@angular/cdk/layout';
import { SpinnerService } from '../../_service/spinner.service';
import { MenuOptionBean } from '../../_model/MenuOptionBean';
import { SharedService } from '../../_service/shared.service';
import {OrderBean} from '../../_model/OrderBean';
import {CarServiceService} from '../../_service/car-service.service';
import {ProfileComponent} from '../sidebar-sidenav/profile/profile.component';
import { Router } from '@angular/router';
import {EditAddProfileComponent} from '../sidebar-sidenav/edit-add-profile/edit-add-profile.component';
import { OrganizationService } from 'src/app/_service/organization.service';

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
  menus:MenuOptionBean[];
  isLogueado: boolean = false;
  userMenu: string;
  logoCompany:any;
  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    public loginService: LoginService,
    public carService:CarServiceService,
    private menuService : MenuOptionService,
    private dialog: MatDialog,
    private media: MediaMatcher,
    public spinnerService: SpinnerService,
    public sharedService:SharedService,
    public companyService:OrganizationService

    ){

      this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
      this.companyService.companyOneCambio.subscribe(data =>{
        if(data._foto != null){
          this.logoCompany=data._foto;
        }
        
      })
     }
     ngOnInit(){
      if(this.sharedService.userSession != null && this.sharedService.getUserIdSession()>0){
        this.isLogueado=true;
        this.menus= this.menuService.menuCambio;
       this.logoCompany=this.sharedService.imagenData;
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
    }

  cerrarSesion() {
    this.isLogueado = false;
    this.carService.orderDetailList=[];
    this.carService.orderHeader = new OrderBean();
    this.sharedService.userSession=undefined;
    this.loginService.cerrarSesion();
  }
}

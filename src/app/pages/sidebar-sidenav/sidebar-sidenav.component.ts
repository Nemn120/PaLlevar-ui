import { Component, OnInit, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { LoginService } from '../../_service/login.service';
import { MenuOptionService } from '../../_service/menu-option.service';
import { UserService } from '../../_service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MediaMatcher } from '@angular/cdk/layout';
import { SpinnerService } from '../../_service/spinner.service';
import { MenuOptionBean } from '../../_model/MenuOptionBean';
import { UserBean } from '../../_model/UserBean';
import { UserProfileComponent } from '../user/user-profile/user-profile.component';
import { SharedService } from '../../_service/shared.service';

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
  constructor(
   
    private changeDetectorRef: ChangeDetectorRef,
    public loginService: LoginService,
    private menuService : MenuOptionService,
    private usuarioService:UserService,
    private dialog: MatDialog,
    private media: MediaMatcher,
    public spinnerService: SpinnerService,
    public sharedService:SharedService
    ){

      this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      // tslint:disable-next-line: deprecation
      this.mobileQuery.addListener(this._mobileQueryListener);
     }
     ngOnInit(){
      //this.menuService.menuCambio.subscribe(data => {
        //this.menus. =
//        this.menuService.menuCambio.subscribe( x => {
          this.menus= this.menuService.menuCambio;
  //      });
        console.log(this.menus);
    //  });
     

    }
    openUserPerfil() {
      let gen :UserBean = new UserBean();
       this.dialog.open(UserProfileComponent, {
         width: '400px',
         data: gen
       });
     }
     
    ngOnDestroy(): void {
      // tslint:disable-next-line: deprecation
      this.mobileQuery.removeListener(this._mobileQueryListener);
      //this.autoLogoutSubscription.unsubscribe();
  }
}

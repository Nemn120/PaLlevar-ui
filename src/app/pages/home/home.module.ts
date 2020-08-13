import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SucursalCardComponent } from './sucursal-card/sucursal-card.component';
import { SucursalShowComponent } from './sucursal-show/sucursal-show.component';
import { MaterialModule } from '../../_material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { GuardService } from '../../_service/guard.service';
import { SidebarSidenavModule } from '../sidebar-sidenav/sidebar-sidenav.module';
import { SidebarSidenavComponent } from '../sidebar-sidenav/sidebar-sidenav.component';
import { UserModule } from '../user/user.module';


const routes: Routes = [
  { path: '', component: SidebarSidenavComponent ,
  children: [
  { path: 'show', component: SucursalShowComponent  },
 ]}
];

@NgModule({
  declarations: [SucursalCardComponent, SucursalShowComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    SidebarSidenavModule,
    UserModule
  ],

  entryComponents: [SidebarSidenavComponent],
  
})
export class HomeModule { }

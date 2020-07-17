import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuListComponent } from './menu-list/menu-list.component';
import { MenuFormComponent } from './menu-form/menu-form.component';
import { Routes, RouterModule } from '@angular/router';
import { SidebarSidenavComponent } from '../sidebar-sidenav/sidebar-sidenav.component';
import { GuardService } from '../../_service/guard.service';
import { MaterialModule } from '../../_material/material.module';
import { SidebarSidenavModule } from '../sidebar-sidenav/sidebar-sidenav.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { VerProductosMenuComponent } from './ver-productos-menu/ver-productos-menu.component';


const routes: Routes = [
  {
    path: "",
    component: SidebarSidenavComponent,
    children: [
      {
        path: "list",
        component: MenuListComponent,
        canActivate: [GuardService],
      },
      {
        path: "form",
        component: MenuFormComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [MenuListComponent, MenuFormComponent, VerProductosMenuComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    SidebarSidenavModule,
    FormsModule,
    ReactiveFormsModule,
 
  ],
  exports: [RouterModule],
  entryComponents: [
    VerProductosMenuComponent
  ],
  

})
export class MenuModule { }

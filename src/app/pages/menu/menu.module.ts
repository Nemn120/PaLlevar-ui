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
import { MenuProductEditComponent } from './menu-product-edit/menu-product-edit.component';
import { DialogoConfirmacionComponent } from '../../_shared/dialogo-confirmacion/dialogo-confirmacion.component';
import { SharedModule } from '../../_shared/shared.module';


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
        path: "edit/:id",
        component: MenuFormComponent,
      },
      {
        path: "form",
        component: MenuFormComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [MenuListComponent, MenuFormComponent, VerProductosMenuComponent, MenuProductEditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    SidebarSidenavModule,
    FormsModule,
    ReactiveFormsModule,
   SharedModule
  ],
  exports: [RouterModule],
  entryComponents: [
    VerProductosMenuComponent,MenuProductEditComponent  ,DialogoConfirmacionComponent

  ],
  

})
export class MenuModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SucursalListComponent } from './sucursal-list/sucursal-list.component';
import { SucursalFormComponent } from './sucursal-form/sucursal-form.component';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { OrganizationFormComponent } from './organization-form/organization-form.component';
import { Routes, RouterModule } from '@angular/router';
import { SidebarSidenavComponent } from '../sidebar-sidenav/sidebar-sidenav.component';
import { SidebarSidenavModule } from '../sidebar-sidenav/sidebar-sidenav.module';
import { GuardService } from '../../_service/guard.service';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../_material/material.module';


const routes: Routes = [

  {///////////mequede aui
    path: "",
    component: SidebarSidenavComponent,
    children: [
          { path: "list", component: OrganizationListComponent  , canActivate: [GuardService] },
    ]
  }
];

@NgModule({
  declarations: [SucursalListComponent, SucursalFormComponent, OrganizationListComponent, OrganizationFormComponent],
  imports: [
    CommonModule,
    SidebarSidenavModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule
  ],
  entryComponents:[
    OrganizationFormComponent
  ]
})
export class OrganizationModule { }

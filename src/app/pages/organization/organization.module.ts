import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SucursalListComponent } from './sucursal-list/sucursal-list.component';
import { SucursalFormComponent } from './sucursal-form/sucursal-form.component';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { OrganizationFormComponent } from './organization-form/organization-form.component';
import { SidebarSidenavComponent } from "../sidebar-sidenav/sidebar-sidenav.component";
import { SidebarSidenavModule } from "../sidebar-sidenav/sidebar-sidenav.module";
import { GuardService } from "../../_service/guard.service";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule, Router } from "@angular/router";
import { MaterialModule } from "../../_material/material.module";


const routes: Routes = [
  {
    
  },
];




@NgModule({
  declarations: [SucursalListComponent, SucursalFormComponent, OrganizationListComponent, OrganizationFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    SidebarSidenavModule,
    FormsModule,
  ],
  exports: [RouterModule],
  entryComponents: [OrganizationFormComponent],
})
export class OrganizationModule { }

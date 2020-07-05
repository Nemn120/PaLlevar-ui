import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SucursalListComponent } from './sucursal-list/sucursal-list.component';
import { SucursalFormComponent } from './sucursal-form/sucursal-form.component';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { OrganizationFormComponent } from './organization-form/organization-form.component';



@NgModule({
  declarations: [SucursalListComponent, SucursalFormComponent, OrganizationListComponent, OrganizationFormComponent],
  imports: [
    CommonModule
  ]
})
export class OrganizationModule { }

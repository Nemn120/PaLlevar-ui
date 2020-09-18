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
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../_material/material.module';
import { OrganizationFormNewComponent } from './organization-form-new/organization-form-new.component';
import { OrganizationViewComponent } from './organization-view/organization-view.component';
import { EditProtocolsComponent } from './edit-protocols/edit-protocols.component';
import { OrganizationEditComponent } from './organization-edit/organization-edit.component';
import { MapaEmpresaComponent } from '../../maps/mapa-empresa/mapa-empresa.component';
import { MapsModule } from '../../maps/maps.module';


const routes: Routes = [

  {///////////mequede aui
    path: "",
    component: SidebarSidenavComponent,
    children: [
          { path: "list", component: OrganizationListComponent  , canActivate: [GuardService] },
          { path: "view", component: OrganizationViewComponent },
    ]
  }
];

@NgModule({
  declarations: [SucursalListComponent, SucursalFormComponent, OrganizationListComponent, 
    OrganizationFormComponent, OrganizationFormNewComponent, OrganizationViewComponent, EditProtocolsComponent, OrganizationEditComponent],
  imports: [
    CommonModule,
    SidebarSidenavModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MapsModule
  ],
  entryComponents:[
    OrganizationFormComponent,
     OrganizationFormNewComponent,
     OrganizationEditComponent,
     EditProtocolsComponent,
     MapaEmpresaComponent
  ]
})
export class OrganizationModule { }

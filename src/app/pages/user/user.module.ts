import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { Routes, RouterModule } from '@angular/router';
import { SidebarSidenavComponent } from '../sidebar-sidenav/sidebar-sidenav.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { DialogFotoComponent } from './user-form/dialog-foto/dialog-foto.component';
import { DialogConfirmacionComponent } from './dialog-confirmacion/dialog-confirmacion.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from 'src/app/_material/material.module';
import { SidebarSidenavModule } from '../sidebar-sidenav/sidebar-sidenav.module';
import { UserDeliverysComponent } from './user-deliverys/user-deliverys.component';
import { UserDeliveryFormComponent } from './user-delivery-form/user-delivery-form.component';


const routes: Routes = [
  {
    path: "",
    component: SidebarSidenavComponent,
    children: [
      {
        path: 'list',
        component: UserListComponent,
      },
      {
        path: 'form',
        component: UserFormComponent,
      },
      {
        path: 'delivery',
        component: UserDeliverysComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [UserListComponent, UserFormComponent, DialogFotoComponent, DialogConfirmacionComponent, UserDeliverysComponent, UserDeliveryFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SidebarSidenavModule,
    FormsModule,
    ReactiveFormsModule,

    MaterialModule,
    MatNativeDateModule,
  ],
  exports: [RouterModule],
  entryComponents: [DialogConfirmacionComponent, DialogFotoComponent],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ]
})
export class UserModule { }

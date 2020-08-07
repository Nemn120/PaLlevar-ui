import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { Routes, RouterModule } from '@angular/router';
import { SidebarSidenavComponent } from '../sidebar-sidenav/sidebar-sidenav.component';
import { GuardService } from 'src/app/_service/guard.service';
import {MatCardModule} from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { SidebarSidenavModule } from '../sidebar-sidenav/sidebar-sidenav.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { DialogFotoComponent } from './user-form/dialog-foto/dialog-foto.component';
import { DialogConfirmacionComponent } from './dialog-confirmacion/dialog-confirmacion.component';
import {MatTableModule} from '@angular/material/table';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from 'src/app/_material/material.module';

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
    ],
  },
];

@NgModule({
  declarations: [UserProfileComponent, UserListComponent, UserFormComponent, DialogFotoComponent, DialogConfirmacionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    
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

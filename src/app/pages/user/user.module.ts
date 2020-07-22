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
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { SidebarSidenavModule } from '../sidebar-sidenav/sidebar-sidenav.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
const routes: Routes = [
  {
    path: "",
    component: SidebarSidenavComponent,
    children: [
      {
        path: "form",
        component: UserListComponent,
        canActivate: [GuardService]
      },
      {
        path: "list",
        component: UserFormComponent,
        canActivate: [GuardService]
      },
    ],
  },
];

@NgModule({
  declarations: [UserProfileComponent, UserListComponent, UserFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SidebarSidenavModule,
    FormsModule,
    ReactiveFormsModule,

    // Material
    MatCardModule,
    MatStepperModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatButtonModule
  ],
  exports: [RouterModule],
  entryComponents: [UserFormComponent]
})
export class UserModule { }

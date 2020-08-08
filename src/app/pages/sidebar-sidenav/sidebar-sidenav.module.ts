import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../_material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { SidebarSidenavComponent } from './sidebar-sidenav.component';
import { UserModule } from '../user/user.module';
import { HeaderComponent } from './header/header.component';
import { EditProfileComponent } from '../user/edit-profile/edit-profile.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [SidebarSidenavComponent, HeaderComponent, ProfileComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    UserModule
  ],

  
  exports: [
    SidebarSidenavComponent
  ],
  entryComponents:[EditProfileComponent],
  
})
export class SidebarSidenavModule { }

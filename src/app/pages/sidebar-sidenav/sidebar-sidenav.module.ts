import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../_material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { SidebarSidenavComponent } from './sidebar-sidenav.component';

import { HeaderComponent } from './header/header.component';

import { ProfileComponent } from './profile/profile.component';

import { EditAddProfileComponent } from './edit-add-profile/edit-add-profile.component';
import { MatInputModule } from '@angular/material/input';




@NgModule({
  declarations: [SidebarSidenavComponent, HeaderComponent, ProfileComponent, EditAddProfileComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule
  ],

  
  exports: [
    SidebarSidenavComponent
  ],

  entryComponents : [ProfileComponent,EditAddProfileComponent],
  
  
})
export class SidebarSidenavModule { }

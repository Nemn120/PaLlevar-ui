import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistryComponent } from './registry/registry.component';
import { MaterialModule } from '../../_material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavHomeComponent } from '../index/nav-home/nav-home.component';
import { IndexModule } from '../index/index.module';


@NgModule({
  declarations: [
    LoginComponent
    , RegistryComponent
  ],
  imports: [
    
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AuthRoutingModule,
    FlexLayoutModule,

    IndexModule,
    
  ]
})
export class AuthorizationModule { }



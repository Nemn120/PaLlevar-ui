import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterLocalRoutingModule } from './register-local-routing.module';
import { RegisterComponent } from './register/register.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../_material/material.module';


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterLocalRoutingModule,
    FlexLayoutModule,
    MaterialModule
  ]
})
export class RegisterLocalModule { }

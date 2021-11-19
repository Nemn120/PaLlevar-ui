import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterLocalRoutingModule } from './register-local-routing.module';
import { RegisterComponent } from './register/register.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../_material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterLocalRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class RegisterLocalModule { }

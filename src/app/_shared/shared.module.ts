import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogoConfirmacionComponent } from './dialogo-confirmacion/dialogo-confirmacion.component';
import { MaterialModule } from '../_material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataClientDialogComponent } from './data-client-dialog/data-client-dialog.component';



@NgModule({
  declarations: [DialogoConfirmacionComponent, DataClientDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule { }

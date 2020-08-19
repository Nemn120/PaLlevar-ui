import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogoConfirmacionComponent } from './dialogo-confirmacion/dialogo-confirmacion.component';
import { MaterialModule } from '../_material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataClientDialogComponent } from './data-client-dialog/data-client-dialog.component';
import { MapsModule } from '../maps/mapa-cliente/maps.module';
import { MapaClienteComponent } from '../maps/mapa-cliente/mapa-cliente.component';



@NgModule({
  declarations: 
  [
    DialogoConfirmacionComponent, 
    DataClientDialogComponent,
   
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
   
    MapsModule

  ],
  
  entryComponents:
  [
  MapaClienteComponent
  ],
  entryComponents: 
  [DialogoConfirmacionComponent],
})
export class SharedModule { }

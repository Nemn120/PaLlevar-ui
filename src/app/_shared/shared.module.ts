import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogoConfirmacionComponent } from './dialogo-confirmacion/dialogo-confirmacion.component';
import { MaterialModule } from '../_material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataClientDialogComponent } from './data-client-dialog/data-client-dialog.component';
import { MapsModule } from '../maps/maps.module';
import { MapaClienteComponent } from '../maps/mapa-cliente/mapa-cliente.component';
import { ClaimDetailComponent } from './claim-detail/claim-detail.component';
import { SummaryOrderComponent } from './summary-order/summary-order.component';



@NgModule({
  declarations:
    [
      DialogoConfirmacionComponent,
      DataClientDialogComponent,
      ClaimDetailComponent,
      SummaryOrderComponent,

    ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MapsModule
  ],

  entryComponents:
    [MapaClienteComponent, DialogoConfirmacionComponent ],
})
export class SharedModule { }

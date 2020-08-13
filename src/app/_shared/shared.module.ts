import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogoConfirmacionComponent } from './dialogo-confirmacion/dialogo-confirmacion.component';
import { MaterialModule } from '../_material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataClientDialogComponent } from './data-client-dialog/data-client-dialog.component';

//MAPBOX
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

import { MapaClienteComponent } from '../maps/mapa-cliente/mapa-cliente.component';


@NgModule({
  declarations: [DialogoConfirmacionComponent, DataClientDialogComponent,
    MapaClienteComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
     //MAPBOX
     NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1Ijoia2F0cmllbCIsImEiOiJja2RjOXlrZTUxM3RsMnlxcmtwd3NrZWMwIn0.buu1mRI4DLdAUacSHR_2gw', // Optional, can also be set per map (accessToken input of mgl-map)
      geocoderAccessToken: 'pk.eyJ1Ijoia2F0cmllbCIsImEiOiJja2RjOXlrZTUxM3RsMnlxcmtwd3NrZWMwIn0.buu1mRI4DLdAUacSHR_2gw',  // Optional, specify if different from the map access token, can also be set per mgl-geocoder (accessToken input of mgl-geocoder)
    })

  ],
  entryComponents:
  [
  MapaClienteComponent
  ],
})
export class SharedModule { }

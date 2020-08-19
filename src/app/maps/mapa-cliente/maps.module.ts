import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//MAPBOX
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { MapaClienteComponent } from './mapa-cliente.component';
import { MaterialModule } from '../../_material/material.module';


@NgModule({
  declarations: [
    MapaClienteComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
      //MAPBOX
      NgxMapboxGLModule.withConfig({
        accessToken: 'pk.eyJ1Ijoia2F0cmllbCIsImEiOiJja2RjOXlrZTUxM3RsMnlxcmtwd3NrZWMwIn0.buu1mRI4DLdAUacSHR_2gw', // Optional, can also be set per map (accessToken input of mgl-map)
        geocoderAccessToken: 'pk.eyJ1Ijoia2F0cmllbCIsImEiOiJja2RjOXlrZTUxM3RsMnlxcmtwd3NrZWMwIn0.buu1mRI4DLdAUacSHR_2gw',  // Optional, specify if different from the map access token, can also be set per mgl-geocoder (accessToken input of mgl-geocoder)
      })
  ],
  exports:[
    MapaClienteComponent,
  ]
})
export class MapsModule { }

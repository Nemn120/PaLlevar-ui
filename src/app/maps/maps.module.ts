import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../_material/material.module';

//MAPBOX
import { environment } from '../../environments/environment.prod';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { MapaClienteComponent } from './mapa-cliente/mapa-cliente.component';
import { MapaEmpresaComponent } from './mapa-empresa/mapa-empresa.component';
import { MapaComponent } from './mapa/mapa.component';



@NgModule({
  declarations: [
    MapaClienteComponent,
    MapaEmpresaComponent,
    MapaComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
      //MAPBOX
      NgxMapboxGLModule.withConfig({
        accessToken: environment.TOKEN_MAPBOX,                                          // Optional, can also be set per map (accessToken input of mgl-map)
        geocoderAccessToken: environment.TOKEN_MAPBOX,                                  // Optional, specify if different from the map access token, can also be set per mgl-geocoder (accessToken input of mgl-geocoder)
      })
  ],
  exports:[
    MapaClienteComponent,
    MapaEmpresaComponent,
  ]
})
export class MapsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../_material/material.module';

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
      
      NgxMapboxGLModule.withConfig({
        accessToken: environment.TOKEN_MAPBOX,                                          
        geocoderAccessToken: environment.TOKEN_MAPBOX,                                  
      })
  ],
  exports:[
    MapaClienteComponent,
    MapaEmpresaComponent,
  ]
})
export class MapsModule { }

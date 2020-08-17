import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, NgZone } from '@angular/core';

import { Marker } from 'mapbox-gl';
import { MapService } from '../../_service/map.service';
import { NotificationService } from '../../_service/notification.service';

@Component({
  selector: 'app-mapa-cliente',
  templateUrl: './mapa-cliente.component.html',
  styleUrls: ['./mapa-cliente.component.scss']
})
export class MapaClienteComponent {

  constructor
    (
      private dialogMap: MatDialogRef<MapaClienteComponent>,
      private mapService:MapService,
      private notification:NotificationService,
  ) {
    dialogMap.disableClose = true
  }

  coordinates: number[];

  estadoMarker: boolean = false;
  positionMarker: number[];
  long: number = -77.0824914;
  lat: number = -12.0587117;

  //REASIGNA LA POSICION DEL MARKER
  updateMarker() {
    if (!this.estadoMarker) {
      this.estadoMarker = true;
      this.positionMarker = [this.long, this.lat];
    } else {
      this.estadoMarker = false;
    }
  }

  //BUSCADOR
  onGeocoder(resultado: any) {
    this.long = resultado.result.geometry.coordinates[0];
    this.lat = resultado.result.geometry.coordinates[1];
  }

  //GEOLOCALIZADOR
  onGeolocate(position: Position) {
    this.long = position.coords.longitude;
    this.lat = position.coords.latitude;
  }


  //MOVER MARKER
  onDragEnd(marker: Marker) {
    NgZone.assertInAngularZone();
    this.long = marker.getLngLat().lng;
    this.lat = marker.getLngLat().lat;
  }

  closeMap() {
    this.dialogMap.close();
  }
  save(){
    this.mapService.newPlace.longitud= this.long;
    this.mapService.newPlace.latitud= this.lat;
    this.notification.openSnackBar('Ubicacion establecida con exito');
    this.dialogMap.close();
  }

}
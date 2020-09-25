import { MatDialogRef } from '@angular/material/dialog';
import { Component, NgZone } from '@angular/core';

import { Marker } from 'mapbox-gl';
import { MapService } from '../../_service/map.service';
import { NotificationService } from '../../_service/notification.service';

@Component({
  selector: 'app-mapa-cliente',
  templateUrl: './mapa-cliente.component.html',
  styleUrls: ['./mapa-cliente.component.scss']
})
export class MapaClienteComponent {

  coordinates: number[];
  estadoMarker: boolean = false;
  positionMarker: number[];
  long: number = -77.0824914;
  lat: number = -12.0587117;

  constructor
    (
      private dialogMap: MatDialogRef<MapaClienteComponent>,
      private mapService: MapService,
      private notification: NotificationService,
  ) {
    dialogMap.disableClose = true
  }

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

  //GUARDAR UBICACION EXACTA
  save() {
    this.mapService.newPlace.longitud = this.long;
    this.mapService.newPlace.latitud = this.lat;
    this.findPlace(this.long, this.lat);
    this.notification.openSnackBar('Ubicacion establecida con exito');
    this.dialogMap.close();
  }

  //BUSQUEDA DEL LUGAR EXACTO
  findPlace(long: number, lat: number) {
    this.mapService.getPlace(long, lat).subscribe(
      data => {
       this.mapService.newPlace.nombre=data.features[0].place_name;
      })
  }

}
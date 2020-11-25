import { Component, NgZone} from '@angular/core';

import { Marker } from 'mapbox-gl';
import { MapService } from '../../_service/map.service';
import { NotificationService } from '../../_service/notification.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-mapa-cliente',
  templateUrl: './mapa-cliente.component.html',
  styleUrls: ['./mapa-cliente.component.scss']
})
export class MapaClienteComponent {

  coordinates: number[];
  estadoMarker: boolean = false;
  
  positionMarker: number[]=[-77.0824914,-12.0587117];
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

  updateMarker() {
    if (!this.estadoMarker) {
      this.estadoMarker = true;
      this.positionMarker = [this.long, this.lat];
    } else {
      this.estadoMarker = false;
    }
  }

  onGeocoder(resultado: any) {
    this.long = resultado.result.geometry.coordinates[0];
    this.lat = resultado.result.geometry.coordinates[1];
  }

  onGeolocate(position: Position) {
    this.long = position.coords.longitude;
    this.lat = position.coords.latitude;
  }

  onDragEnd(marker: Marker) {
    NgZone.assertInAngularZone();
    this.long = marker.getLngLat().lng;
    this.lat = marker.getLngLat().lat;
  }

  closeMap() {
    this.dialogMap.close();
  }

  save() {
    this.mapService.newPlace.longitud = this.long;
    this.mapService.newPlace.latitud = this.lat;
    this.findPlace(this.long, this.lat);
    this.notification.openSnackBar('Ubicacion establecida con exito');
    this.dialogMap.close();
  }

  findPlace(long: number, lat: number) {
    this.mapService.getPlace(long, lat).subscribe(
      data => {
       this.mapService.newPlace.nombre=data.features[0].place_name;
      })
  }

}
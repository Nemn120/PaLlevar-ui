import { Component, NgZone } from '@angular/core';
import { MapService } from '../../_service/map.service';
import { Marker } from 'mapbox-gl';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../_service/notification.service';

@Component({
  selector: 'app-mapa-empresa',
  templateUrl: './mapa-empresa.component.html',
  styleUrls: ['./mapa-empresa.component.scss']
})
export class MapaEmpresaComponent {

  estadoMarker: boolean = false;

  positionMarker: number[];
  long: number = -77.0824914;
  lat: number = -12.0587117;

  name:String='';

  constructor
    (
      private mapService: MapService,
      private notification: NotificationService,
      private dialogMap: MatDialogRef<MapaEmpresaComponent>,
  ) {
    dialogMap.disableClose = true
  }

  //CAPTURA LOS RESULTADOS DEL GEOCODER
  onGeocoder(resultado: any) {
    this.long = resultado.result.geometry.coordinates[0];
    this.lat = resultado.result.geometry.coordinates[1];
  }

  //CAPTURA RESULTADO DEL GEOLOCATE
  onGeolocate(position: Position) {
    this.long = position.coords.longitude;
    this.lat = position.coords.latitude;
  }

  //CAPTURA EL RESULTADO DEL MOVIMIENTO DEL MARKER
  onDragEnd(marker: Marker) {
    NgZone.assertInAngularZone();//DETECCION DE CAMBIOS ASINCRONICOS
    this.long = marker.getLngLat().lng;
    this.lat = marker.getLngLat().lat;
  }

  //ACTUALIZA COORDENADAS
  updateMarker() {
    if (!this.estadoMarker) {
      this.estadoMarker = true;
      this.positionMarker = [this.long, this.lat];
    } else {
      this.estadoMarker = false;
    }
  }

  //GUARDAR UBICACION SELECCIONADA
  save() {    
    console.log('coordenadasIn: ', this.long, ' , ', this.lat);
    this.findPlace(this.long, this.lat);

    this.mapService.newPlace.longitud = this.long;
    this.mapService.newPlace.latitud = this.lat;
    this.mapService.newPlace.nombre = this.name;
    this.notification.openSnackBar('Ubicacion establecida con exito');
    this.dialogMap.close();
  }

  //BUSCA EL LUGAR  APARTIR DE LAS COODENADAS
  findPlace(long: number, lat: number) {
    this.mapService.getPlace(long, lat).subscribe(
      data => {
        console.log('dataOut: ', data);
        console.log('placeOut: ', data.features[0].place_name);
        this.name=data.features[0].place_name;
      })
  }

  //CERRAR MAPA
  closeMap() {
    this.mapService.newPlace.longitud =0;
    this.mapService.newPlace.latitud = 0;
    this.mapService.newPlace.nombre ='';
    this.dialogMap.close();
  }

}

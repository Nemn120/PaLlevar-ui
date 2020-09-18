import { Component, Inject,NgZone } from '@angular/core';
import { MapService } from '../../_service/map.service';
import { Marker } from 'mapbox-gl';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../_service/notification.service';
import { CompanyBean } from '../../_model/CompanyBean';
import { OrganizationService } from '../../_service/organization.service';
import { PlaceBean } from '../../_model/PlaceBean';
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
    @Inject(MAT_DIALOG_DATA) public data: CompanyBean,
    private dialogMap: MatDialogRef<MapaEmpresaComponent>,

    private mapService: MapService,
    private companyService:OrganizationService,
  ) {
    dialogMap.disableClose = true
  }

  //CAPTURA LOS RESULTADOS DEL GEOCODER
  onGeocoder(resultado: any) {
    this.long = resultado.result.geometry.coordinates[0];
    this.lat = resultado.result.geometry.coordinates[1];
    this.findPlace(this.long, this.lat);
  }

  //CAPTURA RESULTADO DEL GEOLOCATE
  onGeolocate(position: Position) {
    this.long = position.coords.longitude;
    this.lat = position.coords.latitude;  
    this.findPlace(this.long, this.lat);
  }

  //CAPTURA EL RESULTADO DEL MOVIMIENTO DEL MARKER
  onDragEnd(marker: Marker) {
    NgZone.assertInAngularZone();//DETECCION DE CAMBIOS ASINCRONICOS
    this.long = marker.getLngLat().lng;
    this.lat = marker.getLngLat().lat;
    this.findPlace(this.long, this.lat);
  }

  //ACTUALIZA COORDENADAS
  updateMarker() {
    if (!this.estadoMarker) {
      this.estadoMarker = true;
      this.positionMarker = [this.long, this.lat];
      this.findPlace(this.long, this.lat);
    } else {
      this.estadoMarker = false;
    }
  }
  //BUSCAR EL LUGAR  APARTIR DE LAS COODENADAS
  findPlace(long: number, lat: number) {
    this.mapService.getPlace(long, lat).subscribe(
      data => {
        this.name=data.features[0].place_name;
      })
  }

  //ACTUALIZAR LUGAR DEL NEGOCIO
  actualizar(){
    let placeUpdate: PlaceBean = new PlaceBean();
    placeUpdate.nombre=this.name;
    placeUpdate.longitud=this.long;
    placeUpdate.latitud= this.lat;
    this.data.place=placeUpdate;

    this.companyService.updateDataCompany(this.data).subscribe( data =>{
      this.companyService.companyOneCambio.next(data.data);
      this.companyService.mensajeCambio.next(data.message);
      this.closeMap()
    },error=>{
      this.companyService.mensajeCambio.next(error.error);
      this.closeMap();
    }); 

  }

  //CERRAR MAPA
  closeMap() {
    this.dialogMap.close();
  }

}

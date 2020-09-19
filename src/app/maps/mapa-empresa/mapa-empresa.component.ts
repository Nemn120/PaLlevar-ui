import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { MapService } from '../../_service/map.service';
import { Marker } from 'mapbox-gl';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { CompanyBean } from '../../_model/CompanyBean';
import { OrganizationService } from '../../_service/organization.service';
import { PlaceBean } from '../../_model/PlaceBean';
@Component({
  selector: 'app-mapa-empresa',
  templateUrl: './mapa-empresa.component.html',
  styleUrls: ['./mapa-empresa.component.scss']
})
export class MapaEmpresaComponent  implements OnInit{
  
  estadoMarker: boolean = false;
  positionMarker: number[]=[-77.0824914,-12.0587117];

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
  ngOnInit(){
    if(this.data.place!=null){
      this.estadoMarker=true;
      this.long=this.data.place.longitud;
      this.lat=this.data.place.latitud;
      this.positionMarker=[this.long,this.lat];
      
    }
  }

  //CAPTURA LOS RESULTADOS DEL GEOCODER
  onGeocoder(resultado: any) {
    this.long = resultado.result.geometry.coordinates[0];
    this.lat = resultado.result.geometry.coordinates[1];
    this.findPlace(this.long, this.lat);
    this.updateMarker();
  }

  //CAPTURA RESULTADO DEL GEOLOCATE
  onGeolocate(position: Position) {
    this.long = position.coords.longitude;
    this.lat = position.coords.latitude;  
    this.findPlace(this.long, this.lat);
    this.updateMarker();
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
    } else {
      this.estadoMarker = false;
    }
    this.positionMarker = [this.long, this.lat];
      this.findPlace(this.long, this.lat);
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
    let company = new CompanyBean();
    company.id=this.data.id;
    if(this.data.place){
      company.place = new PlaceBean();
      company.place.id=this.data.place.id;
      company.place.nombre=this.name;
      company.place.longitud=this.long;
      company.place.latitud= this.lat;
    }else{
      let placeUpdate: PlaceBean = new PlaceBean();
      placeUpdate.nombre=this.name;
      placeUpdate.longitud=this.long;
      placeUpdate.latitud= this.lat;
      company.place=placeUpdate;
    }
    this.companyService.updateDirectionCompany(company).subscribe( data =>{
      this.companyService.getCompanyById(company.id).subscribe(company =>{
        this.companyService.companyOneCambio.next(company);
        this.companyService.mensajeCambio.next(data.message);
        this.closeMap()
      })
      
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

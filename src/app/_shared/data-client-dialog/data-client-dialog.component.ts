import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,MatDialog } from '@angular/material/dialog';
import { OrderBean } from '../../_model/OrderBean';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CarServiceService } from '../../_service/car-service.service';
import { MapaClienteComponent } from '../../maps/mapa-cliente/mapa-cliente.component';
import { PlaceBean } from '../../_model/PlaceBean';
import { MapService } from '../../_service/map.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-data-client-dialog',
  templateUrl: './data-client-dialog.component.html',
  styleUrls: ['./data-client-dialog.component.scss']
})
export class DataClientDialogComponent implements OnInit {
  order:OrderBean
  form: FormGroup;
  constructor(
    public dialogo: MatDialogRef<DataClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderBean,
    private fb: FormBuilder,
    private carService:CarServiceService,
    private dialogMap:MatDialog,
    private mapService:MapService,
   
  ) {}

  ngOnInit(): void {
    this.form =this.fb.group({
      'address' :  new FormControl(''),
      'reference': new FormControl(''),
      'phone': new FormControl('')        
    });
    
  }
  
   enviarOrden(){
   debugger

   //UBICACION DE ENTREGA
    var  placeTemp: PlaceBean = new PlaceBean();
    placeTemp.longitud = this.mapService.newPlace.longitud;
    placeTemp.latitud = this.mapService.newPlace.latitud;
    placeTemp.nombre = this.mapService.newPlace.nombre;
    if(placeTemp.nombre== undefined){
    placeTemp.longitud = 0;
    placeTemp.latitud =0;
    placeTemp.nombre = 'marcador no establecido';
    
    }


    this.order = new OrderBean();
    this.order.place=placeTemp;
    this.order.address=this.form.value['address'];
    this.order.reference=this.form.value['reference'];
    this.order.phone=this.form.value['phone'];
    this.order.organizationId=this.carService.orderHeader.organizationId;
    this.carService.orderHeader=this.order;
    
    console.log('orden con place: ',this.order);
    //this.carService.newOrder.next(this.order);
    this.dialogo.close();
  }

 // Veterinaria Mascopatitas, Av. Bertello 428, Lima, Lima Province, Peru
  
  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }

  abrirMapa(){
    this.dialogMap.open(MapaClienteComponent, {
      width: '50%',
      height: '50%',
    
     });

  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { OrderBean } from '../../_model/OrderBean';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CarServiceService } from '../../_service/car-service.service';
import { DialogoConfirmacionComponent } from '../../_shared/dialogo-confirmacion/dialogo-confirmacion.component';
import { Message } from '../../_DTO/messageDTO';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from 'src/app/_service/order.service';
import { MapaClienteComponent } from '../../maps/mapa-cliente/mapa-cliente.component';
import { PlaceBean } from '../../_model/PlaceBean';
import { MapService } from '../../_service/map.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { NotificationService } from '../../_service/notification.service';

@Component({
  selector: 'app-data-client-dialog',
  templateUrl: './data-client-dialog.component.html',
  styleUrls: ['./data-client-dialog.component.scss']
})
export class DataClientDialogComponent implements OnInit {
  order: OrderBean
  form: FormGroup;
  address: FormControl;
  reference: FormControl;
  phone: FormControl;
  title: string = "Generar Pedido, Ingreso de datos";
  buttonTitle: string = "Registrar";
  isUpdateOrder: boolean = false;
  constructor(
    public dialog: MatDialog, public dialogo: MatDialogRef<DataClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderBean,
    private fb: FormBuilder,
    private carService: CarServiceService,
    private orderService: OrderService,
    private snackBar: MatSnackBar,
    private dialogMap: MatDialog,
    private mapService: MapService,
    private notification: NotificationService,
  ) { }

  enviarOrden() {


    // CUANDO ENVIA LA ORDEN
    if (!this.isUpdateOrder) {

      //debugger
      this.order = new OrderBean();
      this.order.address = this.form.value['address'];
      this.order.reference = this.form.value['reference'];
      this.order.phone = this.form.value['phone'];

      this.order.organizationId = this.carService.orderHeader.organizationId;
      var placeTemp: PlaceBean = new PlaceBean();
      placeTemp.longitud = this.mapService.newPlace.longitud;
      placeTemp.latitud = this.mapService.newPlace.latitud;
      placeTemp.nombre = this.mapService.newPlace.nombre;
      this.order.place = placeTemp;
      this.carService.orderHeader = this.order;
      if (placeTemp.nombre == undefined) {
        placeTemp.longitud = 0;
        placeTemp.latitud = 0;
        placeTemp.nombre = 'marcador no establecido';

      }else{
        this.notification.openSnackBar('Ubicacion guardada exito');
      }
      this.dialog.closeAll();

    } else {

      let ms = new Message();
      ms.title = 'Confirmar Cambios';
      ms.description = '¿Desea guardar los cambios establecidos?';
      this.dialog
        .open(DialogoConfirmacionComponent, {
          data: ms
        })
        .afterClosed()
        .subscribe((confirmado: Boolean) => {
          if (confirmado) {

            this.order = new OrderBean();

            this.order.address = this.form.value['address'];
            this.order.reference = this.form.value['reference'];
            this.order.phone = this.form.value['phone'];
            this.order.organizationId = this.carService.orderHeader.organizationId;
            this.carService.orderHeader = this.order;

            this.dialogo.close();
            this.order.id = this.data.id;
            this.order.status = this.data.status;
            this.orderService.updateOrder(this.order).subscribe(data => {
              this.snackBar.open(data.message, 'SUCESS', { duration: 5000 });
            });

          }
          this.dialog.closeAll();
        });

    }
    
  }


  ngOnInit(): void {

    this.address = new FormControl(''),
      this.reference = new FormControl(''),
      this.phone = new FormControl(''),
      this.form = this.fb.group({
        'address': this.address,
        'reference': this.reference,
        'phone': this.phone,
      });
    if (this.data) {
      this.form.setValue({
        'address': this.data.address,
        'reference': this.data.reference,
        'phone': this.data.phone,


      })
      this.title = "Datos de entrega del pedido"
      this.buttonTitle = "Actualizar"
      this.isUpdateOrder = true;
    }
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

  abrirMapa() {
    this.dialogMap.open(MapaClienteComponent, {
      width: '50%',
      height: '50%',

    });

  }

}

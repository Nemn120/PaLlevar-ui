import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderBean } from '../../../../_model/OrderBean';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CarServiceService } from '../../../../_service/car-service.service';
import { DialogoConfirmacionComponent } from '../../../../_shared/dialogo-confirmacion/dialogo-confirmacion.component';
import { Message } from '../../../../_DTO/messageDTO';
import {  MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-editar-pedido',
  templateUrl: './editar-pedido.component.html',
  styleUrls: ['./editar-pedido.component.scss']
})
export class EditarPedidoComponent implements OnInit {

  form: FormGroup;
  order:OrderBean
  constructor(
    public dialog:MatDialog,public dialogo: MatDialogRef<EditarPedidoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderBean,
    private fb: FormBuilder,
    private carService:CarServiceService,
  ) {
 
   }


   ngOnInit(): void {
    this.form =this.fb.group({
      'address' :  new FormControl(''),
      'reference': new FormControl(''),
      'phone': new FormControl('')        
    });

  }
 //confirmarCambios() sera el metodo que mostrara la ventana de confirmacion de cambio de datos
 confirmarCambios() : void{
  let ms = new Message();
  ms.title='Confirmar Cambios'; 
  ms.description = '¿Desea guardar los cambios establecidos?';
  this.dialog
    .open(DialogoConfirmacionComponent, {
      data: ms
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado){
        console.log("Se guardaron los cambios");
        
        }
        this.dialogo.close();
      });
}

}


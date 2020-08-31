import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderBean } from '../../../../_model/OrderBean';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CarServiceService } from '../../../../_service/car-service.service';
import { DialogoConfirmacionComponent } from '../../../../_shared/dialogo-confirmacion/dialogo-confirmacion.component';
import { Message } from '../../../../_DTO/messageDTO';
import {  MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from 'src/app/_service/order.service';

@Component({
  selector: 'app-enviar-mensaje',
  templateUrl: './enviar-mensaje.component.html',
  styleUrls: ['./enviar-mensaje.component.scss']
})
export class EnviarMensajeComponent implements OnInit {
  order:OrderBean
  form: FormGroup;
  address: FormControl;
  reference: FormControl;
  message: FormControl;
  phone: FormControl;
  
  constructor(
    public dialog:MatDialog,public dialogo: MatDialogRef<EnviarMensajeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderBean,
    private fb: FormBuilder,
    private carService:CarServiceService,
    private orderService: OrderService,
    private snackBar: MatSnackBar,
   
  ) {

  }
 
 
   ngOnInit(): void {
   
   this.address=new FormControl(''),
   this.reference=new FormControl(''),
   this.phone=new FormControl(''),
   this.message=new FormControl(''),
   
     this.form =this.fb.group({
      'address':this.data.address,
       'reference':this.data.reference,
       'phone':this.data.phone,
       'message':this.message,
            
     });
 
   }

   enviarMensaje(){
    let ms = new Message();
    ms.title='Enviar reclamo o comentario'; 
    ms.description = '¿Está seguro de enviar el mensaje';
    
    this.dialog
      .open(DialogoConfirmacionComponent, {
        data: ms
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado){
          
          
          }
          setTimeout (x=>{
            this.dialog.closeAll();
          },2000);
  });

   }
   public hasError = (controlName: string, errorName: string) =>{
     return this.form.controls[controlName].hasError(errorName);
   }
}

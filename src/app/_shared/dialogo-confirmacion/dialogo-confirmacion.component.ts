import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Message } from '../../_DTO/messageDTO';
import { CarServiceService } from '../../_service/car-service.service';
import { OrderBean } from '../../_model/OrderBean';


@Component({
  selector: 'app-dialogo-confirmacion',
  templateUrl: './dialogo-confirmacion.component.html',
  styleUrls: ['./dialogo-confirmacion.component.scss']
})
export class DialogoConfirmacionComponent implements OnInit {
  form: FormGroup;
  order:OrderBean
  constructor(
      public dialogo: MatDialogRef<DialogoConfirmacionComponent>,
      @Inject(MAT_DIALOG_DATA) public mensaje: Message,
      private fb: FormBuilder,
      private carService:CarServiceService,
      ) { }
  
      cerrarDialogo(): void {
        this.dialogo.close(false);
      }
      confirmado(): void {

        this.dialogo.close(true);
      }
      enviarOrden():void{
        
        this.order = new OrderBean();
        this.order.address=this.form.value(['address']);
        this.order.reference=this.form.value(['reference']);
        this.order.phone=this.form.value(['phone']);
        debugger
        this.carService.newOrder.next(this.order);
        this.dialogo.close(true);
      }
  
    ngOnInit() {
     
      this.form =new FormGroup({
        address :  new FormControl('',Validators.required),
        reference: new FormControl('',Validators.required),
        phone: new FormControl('',Validators.required)        
      });

    }

    public hasError = (controlName: string, errorName: string) =>{
      return this.form.controls[controlName].hasError(errorName);
    }
   
  
  }

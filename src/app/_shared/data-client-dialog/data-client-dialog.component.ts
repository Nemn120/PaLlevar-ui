import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderBean } from '../../_model/OrderBean';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CarServiceService } from '../../_service/car-service.service';
import { DialogoConfirmacionComponent } from '../../_shared/dialogo-confirmacion/dialogo-confirmacion.component';
import { Message } from '../../_DTO/messageDTO';
import {  MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from 'src/app/_service/order.service';

@Component({
  selector: 'app-data-client-dialog',
  templateUrl: './data-client-dialog.component.html',
  styleUrls: ['./data-client-dialog.component.scss']
})
export class DataClientDialogComponent implements OnInit {
  order:OrderBean
  form: FormGroup;
  address: FormControl;
  reference: FormControl;
  phone: FormControl;
  title: string="Generar Pedido, Ingreso de datos";
  buttonTitle: string="Registrar";
  isUpdateOrder:boolean=false;
  constructor(
    public dialog:MatDialog,public dialogo: MatDialogRef<DataClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderBean,
    private fb: FormBuilder,
    private carService:CarServiceService,
    private orderService: OrderService,
    private snackBar: MatSnackBar,
   
  ) {
 
   }

   enviarOrden(){
    
   this.order = new OrderBean();
   this.order.address=this.form.value['address'];
   this.order.reference=this.form.value['reference'];
   this.order.phone=this.form.value['phone'];
   
 // CUANDO ENVIA LA ORDEN
   if(!this.isUpdateOrder){
   this.order.organizationId=this.carService.orderHeader.organizationId;
   this.carService.orderHeader=this.order;
   
   }else{
     
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
          this.order.id=this.data.id;
          this.orderService.updateOrder(this.order).subscribe(data => {
            this.snackBar.open(data.message,'SUCESS', { duration: 5000 });
          });
      
        }
        this.dialog.closeAll();
        });

   }
  }


  ngOnInit(): void {
  
  this.address=new FormControl(''),
  this.reference=new FormControl(''),
  this.phone=new FormControl(''),
    this.form =this.fb.group({
      'address':this.address,
      'reference':this.reference,
      'phone': this.phone,        
    });
if(this.data){
    this.form.setValue({
      'address':this.data.address,
      'reference':this.data.reference,
      'phone':this.data.phone,
      
    
    })
    this.title="Actualizar datos del pedido"
    this.buttonTitle="Actualizar"
    this.isUpdateOrder=true;
  }
  }
  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }
 

}

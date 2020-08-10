import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderBean } from '../../../../_model/OrderBean';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CarServiceService } from '../../../../_service/car-service.service';
import { OrderService } from '../../../../_service/order.service';
import { DialogoConfirmacionComponent } from '../../../../_shared/dialogo-confirmacion/dialogo-confirmacion.component';
import { Message } from '../../../../_DTO/messageDTO';
import {  MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-pedido',
  templateUrl: './editar-pedido.component.html',
  styleUrls: ['./editar-pedido.component.scss']
})
export class EditarPedidoComponent implements OnInit {

  
  orderSelect:OrderBean;
  loadingSpinner:boolean=false;
  
  constructor(
    public dialog:MatDialog,public dialogo: MatDialogRef<EditarPedidoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderBean,
    
    private orderService: OrderService,
    private carService: CarServiceService,
    
  ) {
 
   }


   ngOnInit(): void {
    
    this.loadingSpinner=true;
    
      this.orderSelect = new OrderBean();
      this.orderSelect.address = this.data.address;
      this.orderSelect.reference = this.data.reference;
      this.orderSelect.phone = this.data.phone;    
      console.log(this.data);
  

   

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
        this.data.address=this.carService.sendOrder(this.orderSelect).address;
        this.data.reference=this.carService.sendOrder(this.orderSelect).reference;
        this.data.phone=this.carService.sendOrder(this.orderSelect).phone;
        

        
        }
        this.dialogo.close();
      });
}

}


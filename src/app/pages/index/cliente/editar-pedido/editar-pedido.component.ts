import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderBean } from '../../../../_model/OrderBean';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CarServiceService } from '../../../../_service/car-service.service';
import { DialogoConfirmacionComponent } from '../../../../_shared/dialogo-confirmacion/dialogo-confirmacion.component';
import { Message } from '../../../../_DTO/messageDTO';
import { throwMatDialogContentAlreadyAttachedError, MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-editar-pedido',
  templateUrl: './editar-pedido.component.html',
  styleUrls: ['./editar-pedido.component.scss']
})
export class EditarPedidoComponent implements OnInit {

  form: FormGroup;
  
  constructor(
    private dialog:MatDialog,public dialogo: MatDialog,
    private fb: FormBuilder,
  ) {
 
   }


   ngOnInit(): void {
    this.form =this.fb.group({
      'address' :  new FormControl(''),
      'reference': new FormControl(''),
      'phone': new FormControl('')        
    });

  }
 
  confirmarCambios() : void{
    let ms = new Message();
    ms.title='Confirmar Cambios'; 
    ms.description = '¿Desea guardar los cambios establecidos?';
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: ms
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado){
          console.log("Se guardaron los cambios");
          //const numSelected = this.selection.selected;
          //let attendODetail= new Array<OrderDetailBean>();
          //this.selection.selected.forEach(item => {
           //attendODetail.push(item);
          }//);
        
          //this.data.orderDetail=attendODetail;
          //debugger
          /*this.orderService.saveAttendOrder(this.data).subscribe(data =>{
            console.log(attendODetail);
            this.orderDetailList= this.orderDetailList.filter(x => { //ELIMINAR
              return numSelected.indexOf(x) == -1;
            })
            this.dataSource.data=this.orderDetailList;
            this.orderService.getListOrderPendding().subscribe(data =>{ // ACTUALIZA
              this.orderService.orderCambio.next(data); 
            })
          }, error =>{
            console.error(error);
          })
        */
        
  });
}

}

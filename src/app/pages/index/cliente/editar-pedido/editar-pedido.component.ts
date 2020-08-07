import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderBean } from '../../../../_model/OrderBean';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CarServiceService } from '../../../../_service/car-service.service';
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
  
}



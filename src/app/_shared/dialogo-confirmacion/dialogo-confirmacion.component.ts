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
   
  
    ngOnInit() {

    }

  
  
  }

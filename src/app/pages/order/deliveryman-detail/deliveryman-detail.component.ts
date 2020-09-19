import { Component, OnInit, Inject } from '@angular/core';
import { OrderBean } from 'src/app/_model/OrderBean';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderDetailBean } from 'src/app/_model/OrderDetailBean';

@Component({
  selector: 'app-deliveryman-detail',
  templateUrl: './deliveryman-detail.component.html',
  styleUrls: ['./deliveryman-detail.component.scss']
})
export class DeliverymanDetailComponent implements OnInit {

  fechaCreacion: Date;
  fecha:string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: OrderBean,private dialogRef: MatDialogRef<OrderDetailBean>
  ) { }

  ngOnInit(): void {
    this.fechaCreacion = new Date(this.data.deliveryDate);
    this.fecha = this.fechaCreacion.toLocaleString();
  }

  closeDialog() {
    this.dialogRef.close();
  }

}

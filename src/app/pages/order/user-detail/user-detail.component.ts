import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderBean } from 'src/app/_model/OrderBean';
import { OrderDetailBean } from 'src/app/_model/OrderDetailBean';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  fechaCreacion: Date;
  fecha:string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: OrderBean,private dialogRef: MatDialogRef<OrderDetailBean>
  ) { }

  ngOnInit(): void {
    this.fechaCreacion = new Date(this.data.createDate);
    this.fecha = this.fechaCreacion.toLocaleString();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

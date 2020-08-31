import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderBean } from 'src/app/_model/OrderBean';
import { OrderDetailBean } from 'src/app/_model/OrderDetailBean';

@Component({
  selector: 'app-chef-detail',
  templateUrl: './chef-detail.component.html',
  styleUrls: ['./chef-detail.component.scss']
})
export class ChefDetailComponent implements OnInit {

  fechaCreacion: Date;
  fecha:string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: OrderBean,private dialogRef: MatDialogRef<OrderDetailBean>
  ) { }

  ngOnInit(): void {
    this.fechaCreacion = new Date(this.data.attendDate);
    this.fecha = this.fechaCreacion.toLocaleString();
  }

  closeDialog() {
    this.dialogRef.close();
  }

}

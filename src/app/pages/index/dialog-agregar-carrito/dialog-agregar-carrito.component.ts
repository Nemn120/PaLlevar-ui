import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-agregar-carrito',
  templateUrl: './dialog-agregar-carrito.component.html',
  styleUrls: ['./dialog-agregar-carrito.component.scss']
})
export class DialogAgregarCarritoComponent implements OnInit {

  constructor(public dialogo: MatDialogRef<DialogAgregarCarritoComponent>,
              @Inject(MAT_DIALOG_DATA) public mensaje: string) { }

  cerrarDialogo(): void {
    this.dialogo.close(false);
  }
  confirmado(): void {
    this.dialogo.close(true);
  }

  ngOnInit(): void {
  }

}

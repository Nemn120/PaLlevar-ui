import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-carrito",
  templateUrl: "./carrito.component.html",
  styleUrls: ["./carrito.component.scss"],
})
export class CarritoComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {}

  realizarPedido(){
    //guardar con el servicio
  }
}

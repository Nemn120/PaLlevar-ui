import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../_service/order.service';
import { OrderBean } from 'src/app/_model/OrderBean';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  ordenes:OrderBean[];

  constructor(
    private pedidos: OrderService,
  ) { }

  ngOnInit(): void {


    this.pedidos.getListOrderByUserId().subscribe(data=>{
      this.ordenes=data;
    })

  }

}

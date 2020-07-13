import { Component, OnInit } from '@angular/core';
import { CarServiceService } from '../../../_service/car-service.service';
import { SharedService } from '../../../_service/shared.service';
import { OrderDetailBean } from '../../../_model/OrderDetailBean';

@Component({
  selector: 'app-car-dialog',
  templateUrl: './car-dialog.component.html',
  styleUrls: ['./car-dialog.component.scss']
})
export class CarDialogComponent implements OnInit {

  odList:Array<OrderDetailBean> = new Array<OrderDetailBean>();

  constructor(
    private carService:CarServiceService,
    private sharedService:SharedService,
  ) { }

  ngOnInit(): void {
    this.odList=this.carService.getItems();
  }

  sendOrder():void{
    console.log("Pedido enviado");
  }

}

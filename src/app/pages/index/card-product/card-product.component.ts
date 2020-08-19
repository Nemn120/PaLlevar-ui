import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuDayProductBean } from '../../../_model/MenuDayProductBean';
import { OrderDetailBean } from '../../../_model/OrderDetailBean';
import { CarServiceService } from '../../../_service/car-service.service';
import { DataClientDialogComponent } from '../../../_shared/data-client-dialog/data-client-dialog.component';
import { SharedService } from '../../../_service/shared.service';

@Component({
  selector: "app-card-product",
  templateUrl: "./card-product.component.html",
  styleUrls: ["./card-product.component.scss"],
})
export class CardProductComponent implements OnInit {

  @Input() menuProduct:MenuDayProductBean;
 @Input() data:string;
  menuSelect:MenuDayProductBean;
  constructor(
    private dialog:MatDialog,
    private carService:CarServiceService,
    private sharedService:SharedService

  ) { }

  ngOnInit(): void {
    this.menuSelect = new MenuDayProductBean();
    this.menuSelect=this.menuProduct;
  }


  agregarCarrito(){
    let orderDetail = new OrderDetailBean();
    orderDetail.product=this.menuSelect.product;
    orderDetail.organizationId=this.menuSelect.organizationId;
    orderDetail.price=this.menuSelect.price
    orderDetail.menuProductId=this.menuSelect.id;
    this.carService.addProduct(orderDetail);
    if (!this.carService.orderHeader.address) {
      this.openDialog(orderDetail);
    }
  }
  public openDialog(orderDetail: OrderDetailBean) {
    let order = orderDetail != null ? orderDetail : new OrderDetailBean();
    this.dialog.open(DataClientDialogComponent, {
     width: '20%',
     height: '52%',
    data: order
    });
  }
}


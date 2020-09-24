import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuDayProductBean } from '../../../_model/MenuDayProductBean';
import { OrderDetailBean } from '../../../_model/OrderDetailBean';
import { CarServiceService } from '../../../_service/car-service.service';
import { DataClientDialogComponent } from '../../../_shared/data-client-dialog/data-client-dialog.component';
import { SharedService } from '../../../_service/shared.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-card-product-new',
  templateUrl: './card-product-new.component.html',
  styleUrls: ['./card-product-new.component.scss']
})
export class CardProductNewComponent implements OnInit {

  @Input() menuProduct: MenuDayProductBean;
  // @Input() data:string;
  menuSelect: MenuDayProductBean;
  contadorCarrito = 0;

  constructor(
    private dialog: MatDialog,
    private carService: CarServiceService,
    private sharedService: SharedService

  ) { }

  ngOnInit(): void {
    this.menuSelect = new MenuDayProductBean();
    this.menuSelect = this.menuProduct;
  }


  agregarCarrito() {
    // Incrementa el carrito
    this.carService.numberProductSelected ++;

    const orderDetail = new OrderDetailBean();
    orderDetail.product = this.menuSelect.product;
    orderDetail.organizationId = this.menuSelect.organizationId;
    orderDetail.price = this.menuSelect.price;
    orderDetail.menuProductId = this.menuSelect.id;
    this.carService.addProduct(orderDetail);
    // this.contadorCarrito++;
    if (!this.carService.orderHeader.address) {
      this.openDialog(orderDetail);
    }

    console.log(this.menuProduct);
    console.log(this.carService.getItems());
  }
  public openDialog(orderDetail: OrderDetailBean) {
    const order = orderDetail != null ? orderDetail : new OrderDetailBean();
    this.dialog.open(DataClientDialogComponent, {
      width: '600',
      height: '600',
      data: order
    });
  }
}

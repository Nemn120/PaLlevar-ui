import { Component, OnInit } from '@angular/core';
import { CarServiceService } from '../../../_service/car-service.service';
import { SharedService } from '../../../_service/shared.service';
import { OrderDetailBean } from '../../../_model/OrderDetailBean';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MenuDayService } from '../../../_service/menu-day.service';
import { OrderService } from '../../../_service/order.service';
import { LoginService } from '../../../_service/login.service';
import { Router } from '@angular/router';
import { OrderBean } from '../../../_model/OrderBean';

@Component({
  selector: 'app-car-dialog',
  templateUrl: './car-dialog.component.html',
  styleUrls: ['./car-dialog.component.scss']
})
export class CarDialogComponent implements OnInit {

  odList: Array<OrderDetailBean> = new Array<OrderDetailBean>();
  displayedColumns = ['select','name', 'price', 'organization'];
  selection: SelectionModel<OrderDetailBean>;
  dataSource: MatTableDataSource<OrderDetailBean>;
  totalRow: number;
  sendOrderCar:OrderBean;

  constructor(
    public carService: CarServiceService,
    public sharedService: SharedService,
    public orderService:OrderService,
    public loginService:LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.odList = this.carService.getItems();
    this.dataSource = new MatTableDataSource(this.odList);
    this.selection = new SelectionModel<OrderDetailBean>(true, []);
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = !!this.dataSource && this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(r => this.selection.select(r));
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row: OrderDetailBean): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  sendOrder() {
    //debugger;
    const numSelected = this.selection.selected;
    if (numSelected.length > 0) {
      if (confirm("¿Desea realizar el pedido? ")) {
        if(this.sharedService.userSession){
          debugger
          this.sendOrderCar= new OrderBean;
         // this.sendOrderCar=this.carService.getOrder();
          this.sendOrderCar.orderDetail=[];
          numSelected.forEach( x => {
            this.sendOrderCar.orderDetail.push(x);
          })
            
          this.sendOrderCar.userOrder=this.sharedService.userSession;

         console.log(numSelected);
         this.orderService.saveNewOrder(this.sendOrderCar).subscribe(data =>{
          this.carService.deleteProductList(numSelected);
          this.odList=this.carService.getItems();
          this.dataSource.data=this.odList;
         })
        }else{
          this.router.navigate(['auth/login']);
        }
         
      }
    } else {
      alert("Seleccione algun producto");
    }
  }
  deleteProductsSelect(){
    const numSelected = this.selection.selected;
    if (numSelected.length > 0) {
      if (confirm("¿Desea borrar los productos seleccionados del carrito? ")) {
         this.carService.deleteProductList(numSelected);
         this.odList=this.carService.getItems();
         this.dataSource.data=this.odList;
      }
    } else {
      alert("Seleccione el producto a eliminar");
    }
  }



}

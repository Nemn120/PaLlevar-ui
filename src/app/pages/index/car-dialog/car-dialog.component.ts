import { Component, OnInit } from '@angular/core';
import { CarServiceService } from '../../../_service/car-service.service';
import { SharedService } from '../../../_service/shared.service';
import { OrderDetailBean } from '../../../_model/OrderDetailBean';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

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


  constructor(
    public carService: CarServiceService,
    public sharedService: SharedService,
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
         let orderSend:OrderDetailBean[];
         orderSend=numSelected;
         console.log(numSelected);
      }
    } else {
      alert("Seleccione el producto a eliminar");
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

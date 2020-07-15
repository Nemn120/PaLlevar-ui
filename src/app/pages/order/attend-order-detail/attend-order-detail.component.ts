import { Component ,OnInit,Inject} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from "@angular/material/dialog";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from "../dialogo-confirmacion/dialogo-confirmacion.component";
import { OrderBean } from '../../../_model/OrderBean';
import { OrderService } from '../../../_service/order.service';

import { DomSanitizer } from '@angular/platform-browser';
import { SharedService } from '../../../_service/shared.service';
import { OrderDetailBean } from 'src/app/_model/OrderDetailBean';
import { OrderDetailService } from 'src/app/_service/order-detail.service';


@Component({
  selector: 'app-attend-order-detail',
  templateUrl: './attend-order-detail.component.html',
  styleUrls: ['./attend-order-detail.component.scss']
})
export class AttendOrderDetailComponent implements OnInit {
  
  orderSelect: OrderDetailBean;
  selectedFiles: FileList;
  currentFileUpload: File;
  labelFile: string;
  loadingSpinner:boolean=false;
  orderDetailList: OrderDetailBean[];
 

  displayedColumns = ['select', 'id','product', 'price', 'attendDate','status'];
  dataSource : MatTableDataSource<OrderDetailBean>;
  selection : SelectionModel<OrderDetailBean>;

  constructor(public dialogo: MatDialog,
    private dialogRef: MatDialogRef<AttendOrderDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderBean,
    private orderService: OrderService,
    //private orderDetailService: OrderDetailService,
    //private sanitization: DomSanitizer,
    private sharedService: SharedService
    ){
    console.log(this.data);
  }


  ngOnInit(): void {
    this.orderDetailList=this.data.orderDetail;
    this.dataSource = new MatTableDataSource<OrderDetailBean>(this.orderDetailList);
    this.selection = new SelectionModel<OrderDetailBean>(true, []);
    
    //this.listar();
    //this.orderSelect = new OrderDetailBean();
    //if (this.data1.id > 0) {
      //this.orderSelect.id = this.data1.id;
      //this.orderSelect.status = this.data1.status;
     // this.orderSelect.price = this.data1.price;
      //this.orderSelect.attendDate = this.data1.attendDate;
    //} 
  }
  //listar() {
    //this.orderDetailService.getListOrderDetail().subscribe(data1 => {
      //this.orderDetailList = data1;
    //});
  //}

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  atenderPedido() : void{
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: '¿Desea atender los pedidos seleccionados?'
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado){
          const numSelected = this.selection.selected;
          let attendODetail= new Array<OrderDetailBean>();
          this.selection.selected.forEach(item => {
            attendODetail.push(item);
          });
          this.orderDetailList= this.orderDetailList.filter(x => { //ELIMINAR
            return numSelected.indexOf(x) == -1;
          })
          console.log(attendODetail);
          this.dataSource.data=this.orderDetailList;
        }
  });
 }



  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}



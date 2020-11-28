import { Component ,OnInit,Inject} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from "@angular/material/dialog";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderBean } from '../../../_model/OrderBean';
import { OrderService } from '../../../_service/order.service';

import { SharedService } from '../../../_service/shared.service';
import { OrderDetailBean } from 'src/app/_model/OrderDetailBean';
import { Message } from '../../../_DTO/messageDTO';
import { DialogoConfirmacionComponent } from '../../../_shared/dialogo-confirmacion/dialogo-confirmacion.component';


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
 

  displayedColumns = ['select','product', 'price'];
  dataSource : MatTableDataSource<OrderDetailBean>;
  selection : SelectionModel<OrderDetailBean>;

  constructor(public dialogo: MatDialog,
    private dialogRef: MatDialogRef<AttendOrderDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderBean,
    private orderService: OrderService,
    private sharedService: SharedService
    ){ }


  ngOnInit(): void {
    this.orderDetailList=this.data.orderDetail;
   this.orderDetailList=this.orderDetailList.filter(x => x.status=="Pendiente");
    this.dataSource = new MatTableDataSource<OrderDetailBean>(this.orderDetailList);
    this.selection = new SelectionModel<OrderDetailBean>(true, []);

  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  atenderPedido() : void{
    let ms = new Message();
    ms.title='Atender pedidos'; 
    ms.description = '¿Desea atender los pedidos seleccionados?';
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: ms
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado){
          const numSelected = this.selection.selected;
          let attendODetail= new Array<OrderDetailBean>();
          this.selection.selected.forEach(item => {
            attendODetail.push(item);
          });
        
          this.data.orderDetail=attendODetail;
          this.orderService.saveAttendOrder(this.data).subscribe(data =>{
            this.orderDetailList= this.orderDetailList.filter(x => { 
              return numSelected.indexOf(x) == -1;
            })
            this.dataSource.data=this.orderDetailList;
            this.orderService.getListOrderPendding().subscribe(data =>{ 
              this.orderService.orderCambio.next(data); 
            })
            if(this.orderDetailList.length==numSelected.length)this.dialogRef.close();
          }, error =>{
            this.orderService.mensajeCambio.next("Error al atender pedido");
          })
        
        }
  });
 }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}



import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/_service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserBean } from 'src/app/_model/UserBean';
import { OrderBean } from 'src/app/_model/OrderBean';
import { DeliveryOrderDetailComponent } from '../delivery-order-detail/delivery-order-detail.component';
import { OrderService } from 'src/app/_service/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SearchOrderByDeliveryManDTO } from 'src/app/_DTO/SearchOrderByDeliveryManDTO';
import { SharedService } from 'src/app/_service/shared.service';

@Component({
  selector: 'app-pedido-asignado',
  templateUrl: './pedido-asignado.component.html',
  styleUrls: ['./pedido-asignado.component.scss']
})
export class PedidoAsignadoComponent implements OnInit {

  displayedColumns: string[] = ['id', 'status', 'total','quantity','phone','address','reference','createDate'];
  dataSource: MatTableDataSource<OrderBean>;/// tabla 
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  titleProductList: string;
  estados: string[] = ['Entregado','En camino'];
  orderSelect:OrderBean;
  searchOrderByDeliveryManDTO: SearchOrderByDeliveryManDTO;

  constructor(
    private sharedService: SharedService,private userService:UserService, private dialog:MatDialog, private orderService:OrderService, private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.searchOrderByDeliveryManDTO = new SearchOrderByDeliveryManDTO();
    this.searchOrderByDeliveryManDTO.deliveryId= this.sharedService.getUserIdSession();
    this.titleProductList="Listar Productos";
    this.orderService.mensajeCambio.subscribe(data => { // cuando actuqalizas o creas se muestra una notificacion
      this.snackBar.open(data, 'INFO', {
        duration: 2000
      });
    });
    this.getAsignOrderByDeliveryMan();
    console.log(this.searchOrderByDeliveryManDTO);
  }

  public getAsignOrderByDeliveryMan(){
    this.orderService.getAsignOrderByDeliveryMan(this.searchOrderByDeliveryManDTO).subscribe(data => {  
      console.log(data);
      this.dataSource = new MatTableDataSource(data.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    },error =>{
      this.orderService.mensajeCambio.next("Error al mostrar productos");
    });
  }

  public openDialogDetail(order: OrderBean) {
    let orderSelect = order != null ? order : new OrderBean();
    this.dialog.open(DeliveryOrderDetailComponent, {
      width: '600px',
      data: orderSelect
    });
  }



}

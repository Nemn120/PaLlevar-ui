import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderBean } from 'src/app/_model/OrderBean';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/_service/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeliveryOrderDetailComponent } from '../delivery-order-detail/delivery-order-detail.component';
import { SearchOrderByFieldsDTO } from 'src/app/_DTO/SearchOrderByFieldsDTO';
import { SharedService } from 'src/app/_service/shared.service';

@Component({
  selector: 'app-search-order',
  templateUrl: './search-order.component.html',
  styleUrls: ['./search-order.component.scss']
})
export class SearchOrderComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['id','status','name','total','quantity','phone','address','createDate','deliveryDate'];
  dataSource: MatTableDataSource<OrderBean>;/// tabla 
  estados: string[] = ['En camino','Atendido','Pendiente','En proceso'];
  searchOrderByFieldsDTO: SearchOrderByFieldsDTO;
  
  constructor(
    private orderService:OrderService, private dialog:MatDialog, private snackBar: MatSnackBar, private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.searchOrderByFieldsDTO = new SearchOrderByFieldsDTO();
    this.searchOrderByFieldsDTO.organizationId= this.sharedService.getOrganizationIdByUserSession();
    this.orderService.mensajeCambio.subscribe(data => { // cuando actuqalizas o creas se muestra una notificacion
      this.snackBar.open(data, 'INFO', {
        duration: 2000
      });
    });
      this.getAsignOrderByFields();

  }
  public getAsignOrderByFields(){

    this.orderService.getAsignOrderByFields(this.searchOrderByFieldsDTO).subscribe(data => {  
      console.log(data.dataList);
      this.dataSource = new MatTableDataSource(data.dataList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    },error =>{
      this.orderService.mensajeCambio.next("Error al mostrar productos");
    });
    
   console.log(this.searchOrderByFieldsDTO);
  }


  public openDialogDetail(order: OrderBean) {
    let orderSelect = order != null ? order : new OrderBean();
    this.dialog.open(DeliveryOrderDetailComponent, {
      width: '600px',
      data: orderSelect
    });
  }
}

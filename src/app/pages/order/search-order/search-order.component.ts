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
import { UserService } from 'src/app/_service/user.service';
import { UserBean } from 'src/app/_model/UserBean';
import { DeliverymanDetailComponent } from '../deliveryman-detail/deliveryman-detail.component';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { ProfileBean } from 'src/app/_model/ProfileBean';

@Component({
  selector: 'app-search-order',
  templateUrl: './search-order.component.html',
  styleUrls: ['./search-order.component.scss']
})
export class SearchOrderComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['status','documentNumber','name','address','total','quantity','createDate','opciones'];
  dataSource: MatTableDataSource<OrderBean>;/// tabla 
  estados: string[] = ['Todos','En camino','Atendido','Pendiente','Entregado','Cancelado'];
  searchOrderByFieldsDTO: SearchOrderByFieldsDTO;
  DeliveryManList: UserBean[] = [];
  DeliveryManSelect: UserBean;
  ChefList: UserBean[] = [];
  ChefSelect: UserBean;
  
  constructor(
    private orderService:OrderService, private dialog:MatDialog, private snackBar: MatSnackBar, private sharedService: SharedService,
    private userService:UserService
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
    let user = new UserBean();
    user.profile = new ProfileBean();
    user.profile.idProfile = 4;
    this.userService.getUserByFields(user).subscribe(data => {
      let allUser = new UserBean()
      allUser.nombre="Todos";
      this.ChefList = data.dataList;
      this.ChefList.unshift(allUser);
      user.profile.idProfile = 3;
      this.userService.getUserByFields(user).subscribe(data => {
        this.DeliveryManList = data.dataList;
        this.DeliveryManList.unshift(allUser);
        
      })
    })

  }
  public getAsignOrderByFields(){
    if (this.searchOrderByFieldsDTO.status == 'Todos')
      this.searchOrderByFieldsDTO.status = undefined;

    if (this.DeliveryManSelect) {
      if (this.DeliveryManSelect.id)
        this.searchOrderByFieldsDTO.userDeliveryId = this.DeliveryManSelect.id
      if (this.DeliveryManSelect.nombre == 'Todos')
        this.searchOrderByFieldsDTO.userDeliveryId = undefined;
    }

    if (this.ChefSelect) {
      if (this.ChefSelect.id)
        this.searchOrderByFieldsDTO.userAttendId = this.ChefSelect.id;
      if (this.ChefSelect.nombre == 'Todos')
        this.searchOrderByFieldsDTO.userAttendId = undefined;
    }

    this.orderService.getAsignOrderByFields(this.searchOrderByFieldsDTO).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.dataList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
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

  public openClientDetail(order: OrderBean) {
    let orderSelect = order != null ? order : new OrderBean();
    this.dialog.open(UserDetailComponent, {
      width: '600px',
      data: orderSelect
    });
  }

  public openDeliveryDetail(order: OrderBean) {
    let orderSelect = order != null ? order : new OrderBean();
    this.dialog.open(DeliverymanDetailComponent, {
      width: '600px',
      data: orderSelect
    });
  }

  public setColorStatus(status : string):string{
    switch(status){
      case 'En camino': return '#239BAB';
      case 'Atendido': return '#FBF2D4';
      case 'Pendiente': return '#E64A19';
      case 'En proceso': return '#F1894F';
      case 'Cancelado' : return '#3E3E3E' ;
      case 'Entregado' : return '#0CA05B' ;
    }
  }
}


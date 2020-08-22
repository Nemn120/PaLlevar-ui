import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileBean } from "../../../_model/ProfileBean";
import { UserBean } from '../../../_model/UserBean';
import { ProfileMenuOptionBean } from '../../../_model/ProfileMenuOptionBean';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';
import { Router } from '@angular/router';
import { UserService } from '../../../_service/user.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import {UserDeliveryFormComponent} from '../user-delivery-form/user-delivery-form.component';

@Component({
  selector: 'app-user-deliverys',
  templateUrl: './user-deliverys.component.html',
  styleUrls: ['./user-deliverys.component.scss']
})
export class UserDeliverysComponent implements OnInit {z

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ["nombre","username" , "employeeCode","status","actions"];
  dataSource: MatTableDataSource<UserBean>;
  userList: Array<UserBean>;
  deliveryMan: UserBean;
  deliveryMen: any;
  profile: ProfileBean;

  constructor(private dialog: MatDialog, private router: Router,
    private userService:UserService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userService.mensajeCambio.subscribe(data =>{
      this.snackBar.open(data, 'INFO', {
        duration: 3500
      });
    });
    this.userService.userCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    
    this.userService.getListUserDeliveryMan().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data.dataList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    
  }


  // buscar repartidor (en proceso)
  changeState(){
    this.dialog.open(UserDeliveryFormComponent);
  }


  

}

  

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

@Component({
  selector: 'app-user-deliverys',
  templateUrl: './user-deliverys.component.html',
  styleUrls: ['./user-deliverys.component.scss']
})
export class UserDeliverysComponent implements OnInit {z

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ["nombre","username" , "employeeCode","organizationId","idProfile","status","name"];
  dataSource: MatTableDataSource<UserBean>;
  userList: Array<UserBean>;
  deliveryMan = new UserBean();
  deliveryMen: any;
  profile: ProfileBean;

  dato: any;

  constructor(private dialog: MatDialog, private router: Router,
              private userService: UserService, private snackBar: MatSnackBar) {
              }

  ngOnInit(): void {

    /* this.userService.mensajeCambio.subscribe(data =>{
    this.snackBar.open(data, 'INFO', {
        duration: 3500
      });
    });
    this.userService.userCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.userService.getListUserDeliveryMan(this.deliveryMan).subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }); */

    this.userService.getListUserDeliveryMan(this.deliveryMan).subscribe(data => {
      this.dato = data.dataList;
    });

  }


  // buscar repartidor (en proceso)
  openDialog(userBean?: UserBean){
    let userSelect = userBean != null ? userBean : new UserBean();
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: 'auto', height: '850px', data: userSelect
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog close');
    });
  }

}



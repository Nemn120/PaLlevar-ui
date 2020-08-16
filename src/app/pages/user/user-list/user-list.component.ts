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
import { User } from '../../menu/menu-form/menu-form.component';


@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ["id","nombre","username" ,"status", "employeeCode", "dateBirth", "profile"];
  dataSource : MatTableDataSource<UserBean>;
  codeOrganization: number;
  userList : Array<UserBean>;
  

  constructor(private dialog: MatDialog, private router: Router,
    private userService:UserService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.userService.mensajeCambio.subscribe(data => { // cuando actuqalizas o creas se muestra una notificacion
      this.snackBar.open(data, 'INFO', {
        duration: 2000
      });
    });
    this.userService.userCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.userService.getListUserByOrganization().subscribe(data =>{
      this.userList= data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  openDialog(userBean? : UserBean) {

    let userSelect = userBean != null ? userBean : new UserBean();
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: 'auto', height: '850px', data: userSelect
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog close');
    });
  }
}

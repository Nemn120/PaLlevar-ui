import { Component, OnInit, ViewChild } from '@angular/core';
import { UserBean } from '../../../_model/UserBean';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserService } from '../../../_service/user.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['id', 'nombre', 'username' , 'status', 'employeeCode', 'dateBirth', 'profile', 'actions'];
  dataSource: MatTableDataSource<UserBean>;
  codeOrganization: number;
  userList: Array<UserBean>;

  constructor(private dialog: MatDialog,
              private userService: UserService, private snackBar: MatSnackBar) {}

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

    this.userService.getListUserByOrganization().subscribe(data => {
      this.userList = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialog(userBean ?: UserBean) {

    const userSelect = userBean != null ? userBean : new UserBean();
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: 'auto', height: 'auto', data: userSelect
    });
    dialogRef.afterClosed().subscribe(() => {
    });
  }

  public setColorStatus(status : string):string{
    switch(status){
      case 'DISPONIBLE': return '#0CA05B';
      case 'OCUPADO': return '#F1894F';
      case 'EN VACACIONES': return '#F1894F';
    }
  }

  public setColorStatus2(name : string):string{
    switch(name){
      case 'ADMIN_NEG': return '#F24E3E';
      case 'DELIVERY_MAN': return '#C39272';
      case 'CHEF_MAIN': return '#4C78DE';
      case 'ADMIN_DEL': return '#C9446D';
    }
  }
}



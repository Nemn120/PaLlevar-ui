import { Component, OnInit, Sanitizer, ViewChild } from '@angular/core';
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
import { ProfileBean } from '../../../_model/ProfileBean';
import { SharedService } from 'src/app/_service/shared.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-deliverys',
  templateUrl: './user-deliverys.component.html',
  styleUrls: ['./user-deliverys.component.scss']
})
export class UserDeliverysComponent implements OnInit {z

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['nombre', 'username' , 'employeeCode', 'status', 'actions'];
  //dataSource: MatTableDataSource<UserBean>;
  userList: Array<UserBean>;
  deliveryMan = new UserBean();
  deliveryMen: any;
  profile: ProfileBean;
  userDeliveryList: UserBean[];

  dato: any;
  toShow: boolean = false;
  imageData: any;

  constructor(private dialog: MatDialog, private router: Router,
              private userService: UserService, private snackBar: MatSnackBar,
              private sanitization: DomSanitizer, private sharedService: SharedService) {
              }

  ngOnInit(): void {
    
    let user = new UserBean();
    user.profile = new ProfileBean();
    user.profile.idProfile = 3;
    this.userService.getUserByFields(user).subscribe(data => {
      this.userDeliveryList = data.dataList;
      console.log(this.userDeliveryList);
      this.userDeliveryList.forEach(r=>{
        this.userService.getPhotoById(r.id).subscribe(photo=>{
          let reader = new FileReader();
          reader.readAsDataURL(photo);
          reader.onload = () => {
            const base64 = reader.result;
            r._foto = this.setterPhoto(base64);
          };
        })
      })
      /*
      this.userDeliveryList.forEach(r=>{
        /*
        this.userService.getPhotoById(r.id).subscribe(data=>{
          if(data){
            r._isFoto = true;
            r._foto = this.convertir(data);
          }else{
            r._isFoto = false;
            r._foto = [];
          }
        })
        debe ir comentario cerrado
      })
      */
      })
    
    
  }


  // buscar repartidor (en proceso)
  changeState(employee: UserBean) {
    this.dialog.open(UserDeliveryFormComponent, {data: employee});
    console.log('employee: ' + employee.status);
  }

  activatedPhoto(data: any) {
    for (const r of data) {
      this.userService.getPhotoById(r.id).subscribe(photo => {
        let reader = new FileReader();
        reader.readAsDataURL(photo);
        reader.onloadend = () => {
          const base64 = reader.result;
          r._foto = this.setterPhoto(base64);
          r._isFoto = true;
        };
        this.sharedService.loading = false;
      });
    }
  }

  setterPhoto(data: any) {
    return this.sanitization.bypassSecurityTrustResourceUrl(data);
  }



}

import { Component, OnInit } from "@angular/core";
import { ProfileBean } from "../../../_model/ProfileBean";
import { UserBean } from "../../../_model/UserBean";
import { ProfileMenuOptionBean } from '../../../_model/ProfileMenuOptionBean';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';
import { Router } from '@angular/router';

const p: ProfileMenuOptionBean[]=[];

const profile: ProfileBean[] = [
  {
    idProfile: 1,
    name: "empleado 1",
    shortDescription: "el empleado",
    longDescription: "EL EMPLEADO",
    listProfileMenuOption: p,
    createDate: new Date(),
    userCreateId: 1,
    organizationId: 1,
    sucursalId: 1
  },
];
const user: UserBean[] = [
  {
    id: 1,
    nombre: "Jose",
    password: "123",
    status: "disponible",
    address: "av. sol",
    username: "jose",
    employeeCode: "123",
    documentTypeId: "123",
    documentNumber: "123",
    profile: profile[0],
    cellPhone: "918103757",
    dateBirth: new Date(),
    lastName: "Condori",
    _foto: "hay foto",
    _isFoto: true,
    createDate: new Date(),
    userCreateId: 1,
    organizationId: 1,
    sucursalId: 1
  },
];

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ["nombre", "status", "employeeCode", "dateBirth", "profile"];
  dataSource = user;
  codeOrganization: number;
  

  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.codeOrganization = user[0].organizationId;
  }

  openDialog() {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: 'auto', height: '850px', data: this.codeOrganization
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog close');
    });
  }
}

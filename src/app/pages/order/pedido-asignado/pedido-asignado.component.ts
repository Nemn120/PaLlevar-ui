import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserBean } from 'src/app/_model/UserBean';

@Component({
  selector: 'app-pedido-asignado',
  templateUrl: './pedido-asignado.component.html',
  styleUrls: ['./pedido-asignado.component.scss']
})
export class PedidoAsignadoComponent implements OnInit {

  userSelect:UserBean;
  listofUsers:UserBean[];

  constructor(
    private userService:UserService, private dialog:MatDialog
  ) { }

  ngOnInit(): void {

    this.userService.getDeliveryUserList().subscribe(data =>{
      this.listofUsers = data;
    })

  }

}

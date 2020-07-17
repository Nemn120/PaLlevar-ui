import { Component, OnInit,Inject } from '@angular/core';

import {MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MenuDayBean } from 'src/app/_model/MenyDayBean';
@Component({
  selector: 'app-ver-productos-menu',
  templateUrl: './ver-productos-menu.component.html',
  styleUrls: ['./ver-productos-menu.component.scss']
})
export class VerProductosMenuComponent implements OnInit {

  constructor(

    @Inject(MAT_DIALOG_DATA) public data: MenuDayBean,
  ) { }

  ngOnInit(): void {
  }

}

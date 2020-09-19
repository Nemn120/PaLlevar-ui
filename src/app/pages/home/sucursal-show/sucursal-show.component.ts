import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/_service/shared.service';

@Component({
  selector: 'app-sucursal-show',
  templateUrl: './sucursal-show.component.html',
  styleUrls: ['./sucursal-show.component.scss']
})
export class SucursalShowComponent implements OnInit {

  constructor(
    public sharedService:SharedService
  ) {}

  ngOnInit(): void {
  }
}

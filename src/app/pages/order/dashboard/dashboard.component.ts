import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../../../_service/dashboard.service';
import { DashBoardDTO } from '../../../_model/DashboardDTO';
import { OrderBean } from 'src/app/_model/OrderBean';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboardData: DashBoardDTO;
  orders: OrderBean[];
  constructor( private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getDataDashboard().subscribe( dto => {
      this.dashboardData = dto.data;
      this.orders = this.dashboardData.orderPending;
    });
    
  }

  getDashboard(): void {
    this.dashboardService.getDataDashboard().subscribe( dto => {
      this.dashboardData = dto.data;
    });
  }

  getData(opcion: string): void {
    switch(opcion) {
      case 'solicitados':
        this.orders = this.dashboardData.orderDelivery;
        break;
      case 'pendientes':
        this.orders = this.dashboardData.orderPending;
        break;
      case 'atendidos':
        this.orders = this.dashboardData.orderDelivered;
        break;
    }
  }

}

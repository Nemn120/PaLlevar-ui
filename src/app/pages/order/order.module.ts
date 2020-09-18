import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttentOrderComponent } from './attent-order/attent-order.component';
import { DeliveryOrderComponent } from './delivery-order/delivery-order.component';
import { SearchOrderComponent } from './search-order/search-order.component';
import { SendOrderComponent } from './send-order/send-order.component';
import { Routes, Router, RouterModule } from '@angular/router';
import { GuardService } from '../../_service/guard.service';
import { SidebarSidenavComponent } from '../sidebar-sidenav/sidebar-sidenav.component';
import { MaterialModule } from '../../_material/material.module';
import { SidebarSidenavModule } from '../sidebar-sidenav/sidebar-sidenav.module';
import { AttendOrderDetailComponent } from './attend-order-detail/attend-order-detail.component';
import { ConsolidatedOrderComponent } from './consolidated-order/consolidated-order.component';
import { DeliveryOrderDetailComponent } from './delivery-order-detail/delivery-order-detail.component';
import { FormsModule, ReactiveFormsModule } from '../../../../node_modules/@angular/forms';
import { DeliveryOrderAsignComponent } from './delivery-order-asign/delivery-order-asign.component';
import { SharedModule } from '../../_shared/shared.module';
import { DialogoConfirmacionComponent } from '../../_shared/dialogo-confirmacion/dialogo-confirmacion.component';
import { TradeOrderComponent } from './trade-order/trade-order.component';
import { PedidoAsignadoComponent } from './pedido-asignado/pedido-asignado.component';
import { DeliverymanDetailComponent } from './deliveryman-detail/deliveryman-detail.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ConfirmDeliveryOrderComponent } from './confirm-delivery-order/confirm-delivery-order.component';
import { IndexModule } from '../index/index.module';
import { OrderConfirmComponent } from '../index/order-confirm/order-confirm.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
 { path: '', component: SidebarSidenavComponent ,
  children: [
  { path: 'attend', component: AttentOrderComponent, canActivate: [GuardService]  },
  { path: 'delivery', component: DeliveryOrderComponent, canActivate: [GuardService]  },
  { path: 'search', component: SearchOrderComponent, canActivate: [GuardService]  },
  { path: 'trade', component: TradeOrderComponent, canActivate: [GuardService]  },
  { path: 'delivered', component: PedidoAsignadoComponent, canActivate: [GuardService]  },
  { path: 'confirm-delivery', component: ConfirmDeliveryOrderComponent, canActivate: [GuardService]  },
 
  ]}
];


@NgModule({
  declarations: [AttentOrderComponent, DeliveryOrderComponent, SearchOrderComponent, SendOrderComponent, AttendOrderDetailComponent, ConsolidatedOrderComponent, DeliveryOrderDetailComponent, DeliveryOrderAsignComponent, TradeOrderComponent,PedidoAsignadoComponent, DeliverymanDetailComponent, UserDetailComponent, ConfirmDeliveryOrderComponent,DashboardComponent],
  imports: [
    SidebarSidenavModule,
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    IndexModule
  ],
  exports:[
    AttendOrderDetailComponent, DashboardComponent
  ],
  entryComponents: [AttendOrderDetailComponent,DeliveryOrderDetailComponent,DeliveryOrderAsignComponent,DialogoConfirmacionComponent
  ,DeliverymanDetailComponent,UserDetailComponent,OrderConfirmComponent,DialogoConfirmacionComponent]
})
export class OrderModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { NavHomeComponent } from './nav-home/nav-home.component';
import { CardProductComponent } from './card-product/card-product.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../../_material/material.module';
import { CardOrganizationComponent } from './card-organization/card-organization.component';
import { PerfilComponent } from './cliente/perfil/perfil.component';
import { IndexComponent } from './index.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CarDialogComponent } from './car-dialog/car-dialog.component';
import { EditarPerfilComponent } from './cliente/editar-perfil/editar-perfil.component';
import { PedidosComponent } from './cliente/pedidos/pedidos.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../_shared/shared.module';
import { DialogoConfirmacionComponent } from '../../_shared/dialogo-confirmacion/dialogo-confirmacion.component';
import { DataClientDialogComponent } from '../../_shared/data-client-dialog/data-client-dialog.component';
import { DetallePedidoComponent } from './cliente/detalle-pedido/detalle-pedido.component';
import { CardProductNewComponent } from './card-product-new/card-product-new.component';
import { HeaderOrganizationComponent } from './header-organization/header-organization.component';
import { OrderConfirmComponent } from './order-confirm/order-confirm.component';
import { SearchDishComponent } from './search-dish/search-dish.component';
import { MatFabMenuModule } from '@angular-material-extensions/fab-menu';
import { EnviarMensajeComponent } from './cliente/enviar-mensaje/enviar-mensaje.component';
import {ClaimDetailComponent} from '../../_shared/claim-detail/claim-detail.component';
import { MapaComponent } from '../../maps/mapa/mapa.component';
import { SummaryOrderComponent } from 'src/app/_shared/summary-order/summary-order.component';

const routes: Routes = [

  {
    path: "",
    component: IndexComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'shop/:org', component: ShoppingComponent },
      { path: 'dish/:nameDish', component: SearchDishComponent}
    ]
  }
];

@NgModule({
  declarations: [
    IndexComponent,
    HomeComponent,
    ShoppingComponent,
    NavHomeComponent,
    CardProductComponent,
    CardOrganizationComponent,
    PerfilComponent,
    SidebarComponent,
    CarDialogComponent,

    PedidosComponent,

  EditarPerfilComponent,
  PerfilComponent,
  DetallePedidoComponent,
  CardProductNewComponent,
  HeaderOrganizationComponent,
  OrderConfirmComponent,
  SearchDishComponent,
  EnviarMensajeComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MatFabMenuModule
  ],
  exports: [
    RouterModule,
    NavHomeComponent,
  ],
  entryComponents:
    [
      PerfilComponent, PedidosComponent, EditarPerfilComponent, OrderConfirmComponent,
      SidebarComponent, CarDialogComponent, DialogoConfirmacionComponent, DataClientDialogComponent,
      DetallePedidoComponent,EnviarMensajeComponent,ClaimDetailComponent,MapaComponent,SummaryOrderComponent
    ],
})
export class IndexModule { }


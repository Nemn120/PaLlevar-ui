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
import { LoginComponent } from '../authorization/login/login.component';
import { PedidosComponent } from './cliente/pedidos/pedidos.component';
import { EditarPerfilComponent } from './cliente/editar-perfil/editar-perfil.component';
import { DialogAgregarCarritoComponent } from './dialog-agregar-carrito/dialog-agregar-carrito.component';
import { CarritoComponent } from './carrito/carrito.component';
import { DialogAceptarComponent } from './dialog-aceptar/dialog-aceptar.component';

const routes: Routes = [

  {///////////mequede aui
    path: "",
    component: IndexComponent,
    children: [
          
          { path: '', component: HomeComponent  },
          { path: 'shop/:idOrg?', component: ShoppingComponent  },
          
         
        // { path: '',   redirectTo: '/home', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  declarations: [
    IndexComponent,//katriel

  HomeComponent,
  ShoppingComponent,
  NavHomeComponent, 
  CardProductComponent,
  CardOrganizationComponent, 
  
 
 //katriel
  PedidosComponent,

  EditarPerfilComponent,
  PerfilComponent,

  
  DialogAgregarCarritoComponent,
  CarritoComponent,
  DialogAceptarComponent,


  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ],
  exports: [RouterModule],
  entryComponents: 
  [

  PerfilComponent,PedidosComponent,EditarPerfilComponent,

   DialogAgregarCarritoComponent, CarritoComponent
  ],

 
})
export class IndexModule { }


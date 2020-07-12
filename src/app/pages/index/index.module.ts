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
<<<<<<< HEAD
import { PedidosComponent } from './cliente/pedidos/pedidos.component';
import { EditarPerfilComponent } from './cliente/editar-perfil/editar-perfil.component';
=======
import { DialogAgregarCarritoComponent } from './dialog-agregar-carrito/dialog-agregar-carrito.component';
import { CarritoComponent } from './carrito/carrito.component';
import { DialogAceptarComponent } from './dialog-aceptar/dialog-aceptar.component';
>>>>>>> b5b72fbdf66b29d9df4567754ee3fd4a877c8e8d

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
<<<<<<< HEAD
  DetailProductComponent,
 
 
  PerfilComponent,
 
 
  PedidosComponent,
 
 
  EditarPerfilComponent//katriel
=======
  PerfilComponent,
  DialogAgregarCarritoComponent,
  CarritoComponent,
  DialogAceptarComponent,

>>>>>>> b5b72fbdf66b29d9df4567754ee3fd4a877c8e8d

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ],
<<<<<<< HEAD
  exports: [RouterModule,DetailProductComponent],
  entryComponents: [PerfilComponent,PedidosComponent,EditarPerfilComponent],
=======
  exports: [RouterModule,],
  entryComponents: [PerfilComponent, DialogAgregarCarritoComponent, CarritoComponent],
>>>>>>> b5b72fbdf66b29d9df4567754ee3fd4a877c8e8d
})
export class IndexModule { }


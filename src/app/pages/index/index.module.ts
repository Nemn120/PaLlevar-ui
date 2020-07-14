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
import { SidebarComponent } from './sidebar/sidebar.component';
import { CarDialogComponent } from './car-dialog/car-dialog.component';
import { EditarPerfilComponent } from './cliente/editar-perfil/editar-perfil.component';
import { PedidosComponent } from './cliente/pedidos/pedidos.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [

  {///////////mequede aui
    path: "",
    component: IndexComponent,
    children: [
          { path: '', component: HomeComponent  },
          { path: 'shop/:org', component: ShoppingComponent  },
          { path: 'shop/:org/:type', component: ShoppingComponent  },
        // { path: '',   redirectTo: '/home', pathMatch: 'full' },
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
  

 //katriel
  PedidosComponent,

  EditarPerfilComponent,
  PerfilComponent,


  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule,
  ],
  exports: [
    RouterModule,

    NavHomeComponent,//exportando el componente  
   
  ],
  entryComponents: 
  [

  PerfilComponent,PedidosComponent,EditarPerfilComponent,
   SidebarComponent, CarDialogComponent
  ],

 
})
export class IndexModule { }


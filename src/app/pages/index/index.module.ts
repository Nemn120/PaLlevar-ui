import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { NavHomeComponent } from './nav-home/nav-home.component';
import { CardProductComponent } from './card-product/card-product.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../../_material/material.module';
import { MostrarPedidosComponent } from './mostrar-pedidos/mostrar-pedidos.component';
import { ListarPedidoComponent } from './listar-pedido/listar-pedido.component';

//agregados se puede borrar
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserProfileComponent } from '../user/user-profile/user-profile.component';
import { UserModule } from '../user/user.module';
import { DetallesComponent } from './detalles/detalles.component';
import { VerMasComponent } from './ver-mas/ver-mas.component';





const routes: Routes = [
  
  { path: 'home', 
  component: HomeComponent 
  },
  { path: 'shop', 
  component: ShoppingComponent 
  },
  { path: 'card',
   component: CardProductComponent 
  },
  { path: 'mostrar', 
  component: MostrarPedidosComponent 
  },
  { path: 'listar',
   component: ListarPedidoComponent
  },
];

@NgModule({
  declarations: [HomeComponent, ShoppingComponent, NavHomeComponent, CardProductComponent, MostrarPedidosComponent, ListarPedidoComponent, DetallesComponent, VerMasComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    //agregados se puede borrar
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    UserModule
  ],
  //se puede borrar estos dos
  exports: [
    NavHomeComponent,
    RouterModule
  ],
  entryComponents:[
    UserProfileComponent,
    DetallesComponent,
    VerMasComponent
  ]
})
export class IndexModule { }


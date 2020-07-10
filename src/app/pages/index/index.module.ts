import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { NavHomeComponent } from './nav-home/nav-home.component';
import { CardProductComponent } from './card-product/card-product.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../../_material/material.module';
import { CardOrganizationComponent } from './card-organization/card-organization.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { PerfilComponent } from './cliente/perfil/perfil.component';
import { IndexComponent } from './index.component';

const routes: Routes = [

  {///////////mequede aui
    path: "",
    component: IndexComponent,
    children: [
          
          { path: '', component: HomeComponent  },
          { path: 'shop', component: ShoppingComponent  },
          
         /* { path: 'perfil', component: PerfilComponent  },*/
        // { path: 'index',   redirectTo: '/home', pathMatch: 'full' },
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
  DetailProductComponent,
 
 
  PerfilComponent//katriel

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ],
  exports: [RouterModule,DetailProductComponent]
})
export class IndexModule { }


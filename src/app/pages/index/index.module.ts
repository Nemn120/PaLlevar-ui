import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { NavHomeComponent } from './nav-home/nav-home.component';
import { CardProductComponent } from './card-product/card-product.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../../_material/material.module';



const routes: Routes = [
  { path: 'home', component: HomeComponent  },
  { path: 'shop', component: ShoppingComponent  },
];

@NgModule({
  declarations: [HomeComponent, ShoppingComponent, NavHomeComponent, CardProductComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ]
})
export class IndexModule { }


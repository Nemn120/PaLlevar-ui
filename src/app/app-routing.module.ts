import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'org', loadChildren: () => import('./pages/organization/organization.module').then(m => m.OrganizationModule)
  },
  {
    path: 'ord', loadChildren: () => import('./pages/order/order.module').then(m => m.OrderModule)
  },
  {
    path: 'auth', loadChildren: () => import('./pages/authorization/authorization.module').then(m => m.AuthorizationModule)
  },
  {
    path: 'prod', loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'index', loadChildren: () => import('./pages/index/index.module').then(m => m.IndexModule)
  },
  {
    path: 'suc', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'menu', loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuModule)
  },
  { path: '**', pathMatch: 'full', redirectTo: '/index' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

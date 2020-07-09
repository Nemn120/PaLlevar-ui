import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegistryComponent } from './registry/registry.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registry', component: RegistryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

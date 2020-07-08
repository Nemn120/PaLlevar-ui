import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductFormComponent } from "./product-form/product-form.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { CategoryFormComponent } from "./category/category-form/category-form.component";
import { CategoryListComponent } from "./category/category-list/category-list.component";
import { Routes, RouterModule, Router } from "@angular/router";
import { MaterialModule } from "../../_material/material.module";
import { SidebarSidenavComponent } from "../sidebar-sidenav/sidebar-sidenav.component";
import { SidebarSidenavModule } from "../sidebar-sidenav/sidebar-sidenav.module";
import { GuardService } from "../../_service/guard.service";
import { FormsModule } from "@angular/forms";

const routes: Routes = [
<<<<<<< HEAD
  {
    path: "",
    component: SidebarSidenavComponent,
    children: [
      {
        path: "product",
        component: ProductListComponent,
        canActivate: [GuardService],
      },
    ],
  },
=======
 { path: '', component: SidebarSidenavComponent ,
  children: [
    { path: 'product', component: ProductListComponent ,canActivate: [GuardService]},
    { path: 'category', component: CategoryListComponent ,canActivate: [GuardService]},
  ]
   },
>>>>>>> 0bed9cd7750ba3169463fb4e01a36d6a23334c61
];

@NgModule({
  declarations: [
    ProductFormComponent,
    ProductListComponent,
    CategoryFormComponent,
    CategoryListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    SidebarSidenavModule,
    FormsModule,
  ],
<<<<<<< HEAD
  exports: [RouterModule],
  entryComponents: [ProductFormComponent],
=======
  entryComponents:[
    ProductFormComponent,
    CategoryFormComponent
  ]
>>>>>>> 0bed9cd7750ba3169463fb4e01a36d6a23334c61
})
export class ProductModule {}

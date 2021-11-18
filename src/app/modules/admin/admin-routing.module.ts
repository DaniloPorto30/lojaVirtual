import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [

  {
    path:'',
    component: AdminPageComponent,
    children:[
      { path:'home', component: HomeComponent },
      { path:'products', component: ProductsComponent },
      { path:'', redirectTo: '/admin/home', pathMatch:'full'},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

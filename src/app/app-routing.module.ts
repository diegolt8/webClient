import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewClientComponent } from './page/view-client/view-client.component';
import { HomeComponent } from './page/home/home.component';
import { InfoProductComponent } from './page/info-product/info-product.component';


const routes: Routes = [
  { path: 'viewClient', component: ViewClientComponent },
  { path: '', component: HomeComponent },
  { path: 'infoProducts', component: InfoProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

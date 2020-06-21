import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForSaleComponent } from './components/search/for-sale/for-sale.component';


const routes: Routes = [
  {path: 'searchForSale', component: ForSaleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

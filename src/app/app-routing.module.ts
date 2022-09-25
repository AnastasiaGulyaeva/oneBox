import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillboardItemComponent } from './billboard/billboard-item/billboard-item.component';
import { BillboardComponent } from './billboard/billboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: '', component : BillboardComponent },
  { path: 'event/:id', component : BillboardItemComponent },
  { path: 'shoppingCart', component : ShoppingCartComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

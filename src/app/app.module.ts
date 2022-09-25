import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BillboardComponent } from './billboard/billboard.component';
import { BillboardItemComponent } from './billboard/billboard-item/billboard-item.component';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SortSessionsPipe } from './pipes/sortSessions.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BillboardComponent,
    BillboardItemComponent,
    ShoppingCartComponent,
    NotFoundComponent,
    SortSessionsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

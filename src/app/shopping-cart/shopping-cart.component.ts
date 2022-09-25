import { Component, OnInit } from '@angular/core';
import { Cart, SessionCart } from '../interfaces/cart.interface';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  cart: Cart[] = [];
  
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.cartService.currentDataCart$.subscribe(cartEvent => {
      this.cart = cartEvent;
    });
  }

  isItemDisplayed(sessions: SessionCart[]) {
    return sessions.find(session => session.quantity);
  }

  deleteEvent(id:string, title:string, session:SessionCart) {
    session.quantity = 0;
    this.cartService.changeEvent({
      id,
      title,
      sessions: [session]
    });
  }

  checkout() {
    console.log(this.cart.map(event => event.sessions.filter(session => session.quantity > 0))
      .filter(event => event.length > 0));
  }
}

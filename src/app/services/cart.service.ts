import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../interfaces/cart.interface';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart = new BehaviorSubject<Cart[]>([]);
  public currentDataCart$: Observable<Cart[]> = this.cart.asObservable();

  constructor() {
    const cartFromStorage = localStorage.getItem("cart");
    this.cart.next(cartFromStorage ? JSON.parse(cartFromStorage) : []);
  }

  changeEvent(event:Cart) {
    let listCart = this.cart.getValue();
    const eventIndex = listCart.findIndex(item => item.id === event.id);
    if(eventIndex !== -1) {
      const sessionIndex = listCart[eventIndex].sessions.findIndex(session => session.date === event.sessions[0].date);
      if(sessionIndex !== -1) {
        listCart[eventIndex].sessions[sessionIndex] = event.sessions[0];
      } else {
        listCart[eventIndex].sessions.push(event.sessions[0]);
      }
    } else {
      listCart.push(event);
    }
    localStorage.setItem("cart", JSON.stringify(listCart));
    this.cart.next(listCart);
  } 
}

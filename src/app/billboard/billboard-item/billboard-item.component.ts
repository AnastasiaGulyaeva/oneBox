import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { EventInfo } from 'src/app/interfaces/event.interface';
import { CartService } from 'src/app/services/cart.service';
import { EventServiceService } from 'src/app/services/event.service';

@Component({
  selector: 'app-billboard-item',
  templateUrl: './billboard-item.component.html',
  styleUrls: ['./billboard-item.component.scss']
})
export class BillboardItemComponent implements OnInit {

  eventInfo:EventInfo;

  constructor( 
    private activatedRoute: ActivatedRoute,
    private eventsService: EventServiceService,
    private cartService: CartService,
  ) { 
    this.eventInfo = <EventInfo>{};
  }

  ngOnInit(): void {
    const cartFromStorageStr = localStorage.getItem("cart");
    const cartFromStorage = cartFromStorageStr ? JSON.parse(cartFromStorageStr): []; 
    
    this.cartService.currentDataCart$.subscribe(cartEvent => {
      const sessions = cartEvent.find(e => e.id === this.activatedRoute.snapshot.params['id'])?.sessions;
      if(sessions) {
        this.eventInfo.sessions = sessions;
      }
    });

    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.eventsService.getEventInfo(id))
      )
      .subscribe(eventInfo => {
        const id = eventInfo.event.id;
        const sessions = (cartFromStorage.find((e:any) => e.id === id) || {}).sessions || [];
        this.eventInfo = { 
          ...eventInfo,
          sessions: 
            eventInfo.sessions
            .map(session => {
              return {
                ...session,
                quantity: session.quantity || (sessions.find((s:any) => s.date === session.date) || {}).quantity || 0
              };
            })
        };
      });

  }

  addToCart(session:any) {
    if(session.quantity < session.availability) {
      session.quantity++;
    }
    this.cartService.changeEvent({
      id: this.eventInfo.event.id,
      title:this.eventInfo.event.title,
      sessions: [session]
    });
  }

  removeFromCart(session:any) {
    if(session.quantity) {
      session.quantity--;
    }
    this.cartService.changeEvent({
      id: this.eventInfo.event.id,
      title:this.eventInfo.event.title,
      sessions: [session]
    });
  }
}

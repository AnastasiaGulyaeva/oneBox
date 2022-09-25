import { Component, OnInit } from '@angular/core';
import { Events } from '../interfaces/events.interface';
import { EventServiceService } from '../services/event.service';

@Component({
  selector: 'app-billboard',
  templateUrl: './billboard.component.html',
  styleUrls: ['./billboard.component.scss']
})
export class BillboardComponent implements OnInit {
  events:Events[] = []; 

  constructor(private eventsService: EventServiceService) { }

  ngOnInit(): void {
    this.eventsService.getEvents().subscribe(event =>{
      this.events = event;
    });
  }

}

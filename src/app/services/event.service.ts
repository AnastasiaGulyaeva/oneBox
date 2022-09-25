import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { EventInfo } from '../interfaces/event.interface';

import { Events } from '../interfaces/events.interface';


@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  constructor(
    private http: HttpClient,
    private router: Router
    ) {}

   public getEvents(): Observable<Events[]> {
      return this.http.get<Events[]>('assets/data/events.json')   
  }

  public getEventInfo(id: string): Observable<EventInfo> {
    return this.http
      .get<EventInfo>(`assets/data/event-info-${id}.json`)
      .pipe(
        catchError((error) => {
          this.router.navigate(['/404'])
          return throwError(() => error);
        })
      )
  }
}

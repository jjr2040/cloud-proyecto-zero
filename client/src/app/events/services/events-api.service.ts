import { Event } from './../models/event';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsApiService {

  private apiUrl = environment.serverUrl + '/events';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  findOne(id: number): Observable<Event> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Event>(url);
  }

  update(event: Event): Observable<Event> {
    return this.http.patch<Event>(this.apiUrl, event);
  }

  delete(event: Event): Observable<any> {
    const url = `${this.apiUrl}/${event.id}`;
    return this.http.delete<any>(url);
  }

  create(event: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event);
  }
}

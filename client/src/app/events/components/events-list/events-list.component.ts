import { CreateEventComponent } from './../create-event/create-event.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Event } from '../../models/event';
import { EventsApiService } from '../../services/events-api.service';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  events: Event[] = [];

  constructor(
    private eventsService: EventsApiService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.eventsService.findAll().subscribe( events => this.events = events );
  }

  openCreateEventModal() {
    const modal = this.modalService.open(CreateEventComponent);
    modal.result.then( event => this.events.push(event) );
  }

  delete(event: Event) {
    this.eventsService.delete(event).subscribe( () => {
      _.remove(this.events, (e: Event) => e.id === event.id);
    });
  }

  edit(event: Event) {
    const modal = this.modalService.open(CreateEventComponent);
    modal.componentInstance.event = event;
    modal.result.then( updatedEvent => {
      _.remove(this.events, (e: Event) => e.id === event.id);
      this.events.push(updatedEvent);
    });
  }

  showDetail(event: Event) {
    const modal = this.modalService.open(CreateEventComponent);
    modal.componentInstance.readOnly = true;
  }
}

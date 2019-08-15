import { Event } from './../../models/event';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { EventsApiService } from '../../services/events-api.service';
import { NgbActiveModal, NgbDate, NgbCalendar, NgbCalendarGregorian } from '@ng-bootstrap/ng-bootstrap';
import { EventCategory } from '../../models/event';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  @Input() event?: Event;
  @Input() readOnly = false;

  eventForm: FormGroup;
  loading = false;
  error = '';
  submitted = false;
  categories = [
    EventCategory.CONFERENCE,
    EventCategory.CONGRES,
    EventCategory.COURSE,
    EventCategory.SEMINARY
  ];

  constructor(
    private eventsService: EventsApiService,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    if (!this.event) {
      this.event = new Event();
    }

    this.eventForm = this.formBuilder.group({
      name: [{ value: this.event.name, disabled: this.readOnly }, Validators.required],
      category: [{ value: this.event.category, disabled: this.readOnly }, Validators.required],
      place: [{ value: this.event.place, disabled: this.readOnly }, Validators.required],
      address: [{ value: this.event.address, disabled: this.readOnly }, Validators.required],
      startsAt: [{ value: this.dateToNgbDate(this.event.startsAt), disabled: this.readOnly }, Validators.required],
      endsAt: [{ value: this.dateToNgbDate(this.event.endsAt), disabled: this.readOnly }, Validators.required],
      isVirtual: [{ value: this.event.isVirtual, disabled: this.readOnly }, Validators.required]
    });
  }

  get f(): any { return this.eventForm.controls; }

  dismiss() {
    this.activeModal.dismiss('close');
  }

  onSubmit() {
    this.submitted = true;

    if (this.eventForm.invalid) { return; }

    this.loading = true;

    const event: Event = this.eventForm.value;

    this.eventsService.create(event).subscribe( newEvent => {
      this.activeModal.close(newEvent);
    }, error => {
      this.error = error;
    });
  }

  private dateToNgbDate(dateString?: string): NgbDate {
    if (dateString) {
      const date = new Date(dateString);
      return new NgbDate(date.getFullYear(), date.getMonth(), date.getDay());
    }
    return new NgbCalendarGregorian().getToday();
  }
}

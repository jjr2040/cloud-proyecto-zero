import { Event } from './../../models/event';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { EventsApiService } from '../../services/events-api.service';
import { NgbActiveModal, NgbDate, NgbCalendar, NgbCalendarGregorian, NgbDateStruct, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { EventCategory } from '../../models/event';
import { NgbDateISOParserFormatter } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-parser-formatter';

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

  get actionName(): string {
    return this.event.id ? 'Editar' : 'Crear';
  }

  dismiss() {
    this.activeModal.dismiss('close');
  }

  onSubmit() {
    this.submitted = true;

    if (this.eventForm.invalid) { return; }

    this.loading = true;

    const event: any = this.eventForm.value;

    if (this.event.id) {
      event.id = this.event.id;
      event.createdAt = this.dateToNgbDate(this.event.createdAt);

      this.eventsService.update(event).subscribe( newEvent => {
        this.activeModal.close(newEvent);
      }, error => {
        this.error = error;
      });
    } else {
      this.eventsService.create(event).subscribe( newEvent => {
        this.activeModal.close(newEvent);
      }, error => {
        this.error = error;
      });
    }
  }

  private dateToNgbDate(dateString?: string): NgbDateStruct {
    if (dateString) {
      const date = new Date(dateString);
      return new NgbDateNativeAdapter().fromModel(date);
    }
    return new NgbCalendarGregorian().getToday();
  }
}

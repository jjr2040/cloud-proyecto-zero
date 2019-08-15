import { Event } from './../../models/event';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { EventsApiService } from '../../services/events-api.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventCategory } from '../../models/event';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  @Input() event;
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
    this.eventForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      place: ['', Validators.required],
      address: ['', Validators.required],
      startsAt: [Date(), Validators.required],
      endsAt: [Date(), Validators.required],
      isVirtual: [false, Validators.required]
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

}

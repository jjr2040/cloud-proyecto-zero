import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsListComponent } from './components/events-list/events-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from '../auth/services/jwt.interceptor';
import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [EventsListComponent, CreateEventComponent],
  imports: [
    CommonModule,
    EventsRoutingModule,
    AuthModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgbDatepickerModule
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  entryComponents: [CreateEventComponent]
})
export class EventsModule { }

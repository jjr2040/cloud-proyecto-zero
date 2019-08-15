import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsListComponent } from './components/events-list/events-list.component';
import { AuthGuard } from '../auth/guards/auth.guard';


const routes: Routes = [
  { path: 'events', component: EventsListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }

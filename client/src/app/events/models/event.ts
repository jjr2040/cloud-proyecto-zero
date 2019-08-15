import { User } from './../../auth/models/user';

export enum EventCategory {
  CONFERENCE = 'conferencia',
  SEMINARY = 'seminario',
  CONGRES = 'congreso',
  COURSE = 'curso',
}

export class Event {
  id: number;
  name: string;
  category: EventCategory;
  place: string;
  address: string;
  startsAt: Date;
  endsAt: Date;
  isVirtual: boolean;
  createdAt: Date;
  createdBy: User;
}

import { Injectable } from '@nestjs/common';
import { Repository, DeleteResult } from 'typeorm';
import { Event } from './event.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EventsService {

  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
  ) {}

  async findOne(id: number): Promise<Event | undefined> {
    return this.eventsRepository.findOne(id);
  }

  async findAll(userId: number): Promise<Event[]> {
    return this.eventsRepository.find({ where: { userId } });
  }

  async save(event: Event): Promise<Event> {
    return this.eventsRepository.save(event);
  }

  async delete(eventId: number): Promise<DeleteResult> {
    return this.eventsRepository.delete(eventId);
  }
}

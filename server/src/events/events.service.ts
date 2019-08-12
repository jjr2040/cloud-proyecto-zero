import { Injectable } from '@nestjs/common';
import { Repository, DeleteResult } from 'typeorm';
import { Event } from './event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class EventsService {

  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<Event | undefined> {
    return this.eventsRepository.findOne(id);
  }

  async findAll(userId: number): Promise<Event[]> {
    return this.eventsRepository.find({ where: { userId } });
  }

  async save(event: Event, userId: number): Promise<Event> {
    const user = await this.usersRepository.findOne(userId);
    event.createdBy = user;
    return this.eventsRepository.save(event);
  }

  async delete(eventId: number): Promise<DeleteResult> {
    return this.eventsRepository.delete(eventId);
  }
}

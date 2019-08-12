import { Controller, UseGuards, Get, Param, Request, Delete, Post, Body, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EventsService } from './events.service';
import { Event } from './event.entity';

@UseGuards(AuthGuard())
@Controller('events')
export class EventsController {

  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async getEvents(@Request() req) {
    const { userId } = req;
    return this.eventsService.findAll(userId);
  }

  @Get(':id')
  async getEvent(@Param('id') id) {
    return this.eventsService.findOne(id);
  }

  @Delete(':id')
  async deleteEvent(@Param('id') id) {
    return this.eventsService.delete(id);
  }

  @Patch()
  async updateEvent(@Body() event: Event, @Request() req) {
    const { userId } = req.user;
    return this.eventsService.save(event, userId);
  }

  @Post()
  async saveEvent(@Body() eventData: any, @Request() req) {
    const { userId } = req;
    const { name, category, place, address, startsAt, endsAt, isVirtual } = eventData;
    const event: Event = new Event();

    event.name = name;
    event.category = category;
    event.place = place;
    event.address = address;
    event.startsAt = new Date(startsAt);
    event.endsAt = new Date(endsAt);
    event.isVirtual = isVirtual;

    return this.eventsService.save(event, userId);
  }

}

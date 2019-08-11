import { Controller, UseGuards, Get, Param, Request, Delete, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EventsService } from './events.service';
import { Event } from './event.entity';

@UseGuards(AuthGuard())
@Controller('events')
export class EventsController {

  constructor(private readonly eventsService: EventsService) {}

  @Get(':id')
  async getEvent(@Param('id') id) {
    return this.eventsService.findOne(id);
  }

  @Delete(':id')
  async deleteEvent(@Param('id') id) {
    return this.eventsService.delete(id);
  }

  @Get()
  async getEvents(@Request() req) {
    const { userId } = req;
    return this.eventsService.findAll(userId);
  }

  @Post()
  async saveEvent(@Body() event: Event) {
    return this.eventsService.save(event);
  }

}

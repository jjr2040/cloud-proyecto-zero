import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';

@Module({
  providers: [EventsService],
  controllers: [EventsController],
  imports: [
    TypeOrmModule.forFeature([Event]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
})
export class EventsModule {}

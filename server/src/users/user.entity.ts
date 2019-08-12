import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Index } from 'typeorm';
import { Event } from '../events/event.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(type => Event, event => event.createdBy)
  events: Event[];

}

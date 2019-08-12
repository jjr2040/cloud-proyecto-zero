import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';

export enum EventCategory {
  CONFERENCE = 'conferencia',
  SEMINARY = 'seminario',
  CONGRES = 'congreso',
  COURSE = 'curso',
}

@Entity()
export class Event {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: EventCategory,
    default: EventCategory.CONFERENCE,
  })
  category: EventCategory;

  @Column()
  place: string;

  @Column()
  address: string;

  @Column()
  startsAt: Date;

  @Column()
  endsAt: Date;

  @Column()
  isVirtual: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(type => User)
  @JoinColumn()
  createdBy: User;
}

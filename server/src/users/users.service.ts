import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ email });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async save(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }
}

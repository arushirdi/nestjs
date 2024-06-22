import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } }); // Specify id as number
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async create(user: User): Promise<User> {
    return await this.usersRepository.save(user);
  }

  async update(id: number, updateUserDto: Partial<User>): Promise<User> {
    const user = await this.findById(id);
    return await this.usersRepository.save({ ...user, ...updateUserDto });
  }

  async delete(id: number): Promise<void> {
    const user = await this.findById(id);
    await this.usersRepository.remove(user);
  }

  async deleteAll(): Promise<void> {
    await this.usersRepository.clear();
  }
}

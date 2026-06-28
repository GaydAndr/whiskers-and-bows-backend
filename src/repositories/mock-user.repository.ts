import { Injectable } from '@nestjs/common';
import { IUserRepository } from './user.repository';
import { User } from '@whiskers-bows/shared';

@Injectable()
export class MockUserRepository implements IUserRepository {
  private users: User[] = [
    {
      id: 'u1',
      firstName: 'Іван',
      lastName: 'Іванов',
      email: 'user@example.com',
      phone: '+380991234567',
      password: 'password123',
      role: 'CUSTOMER',
      address: { city: 'Київ', novaPoshtaBranch: '1' },
      createdAt: new Date(),
    },
    {
      id: 'u2',
      firstName: 'Адмін',
      lastName: 'Кіт',
      email: 'admin@whiskersbows.ua',
      phone: '+380990000000',
      password: 'adminpassword',
      role: 'ADMIN',
      address: { city: 'Львів', novaPoshtaBranch: '2' },
      createdAt: new Date(),
    },
  ];

  async findById(id: string): Promise<User | null> {
    return this.users.find((u) => u.id === id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((u) => u.email === email) || null;
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phone: user.phone || '',
      password: user.password || '',
       role: user.role || 'CUSTOMER',
      address: user.address || { city: '', novaPoshtaBranch: '' },
      createdAt: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  async update(id: string, user: Partial<User>): Promise<User | null> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return null;
    this.users[index] = { ...this.users[index], ...user };
    return this.users[index];
  }
}

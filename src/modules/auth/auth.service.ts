import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { MongoUserRepository } from '../../repositories/mongo-user.repository';
import { User } from '@whiskers-bows/shared';
import { EmailService } from '../email/email.service';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: MongoUserRepository,
    private emailService: EmailService,
  ) {}

  async login(
    email: string,
    pass: string,
  ): Promise<{ user: User; token: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user || user.password !== pass) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return {
      user: { ...user, password: undefined },
      token: 'mock-jwt-token',
    };
  }

  async register(userData: Partial<User>): Promise<User> {
    const existing = await this.userRepository.findByEmail(
      userData.email || '',
    );
    if (existing) {
      throw new UnauthorizedException('User already exists');
    }

    const userToCreate = {
      ...userData,
      role: userData.role || 'CUSTOMER',
      phone: userData.phone || 'Not provided',
      address: userData.address || {
        city: 'Not provided',
        novaPoshtaBranch: 'Not provided',
      },
    };

    return this.userRepository.create(userToCreate);
  }

  async getProfile(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new UnauthorizedException('User not found');
    return { ...user, password: undefined };
  }

  async updateProfile(userId: string, data: Partial<User>): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new UnauthorizedException('User not found');
    
    const updatedUser = await this.userRepository.update(userId, data);
    if (!updatedUser) throw new UnauthorizedException('User not found after update');
    return { ...updatedUser, password: undefined };
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User with this email not found');
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 3600000); // 1 hour

    await this.userRepository.update(user.id, {
      resetPasswordToken: token,
      resetPasswordExpires: expires,
    } as any);

    await this.emailService.sendResetPasswordEmail(email, token);
  }

  async resetPassword(token: string, newPassword: string): Promise<User> {
    const user = await this.userRepository.findByToken(token);
    if (!user) {
      throw new NotFoundException('Invalid or expired reset token');
    }

    if (!user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
      throw new NotFoundException('Invalid or expired reset token');
    }

    const updatedUser = await this.userRepository.update(user.id, {
      password: newPassword,
      resetPasswordToken: undefined,
      resetPasswordExpires: undefined,
    });

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return { ...updatedUser, password: undefined };
  }
}

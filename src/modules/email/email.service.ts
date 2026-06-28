import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { Order } from '../shared/types';

@Injectable()
export class EmailService {
  private resend: Resend;

  constructor(private configService: ConfigService) {
    this.resend = new Resend(this.configService.get<string>('RESEND_API_KEY'));
  }

  async sendResetPasswordEmail(email: string, token: string): Promise<void> {
    const resetLink = `http://localhost:3000/reset-password?token=${token}`;
    
    await this.resend.emails.send({
      from: this.configService.get<string>('RESEND_FROM_EMAIL') || 'onboarding@resend.dev',
      to: email,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset. Click the link below to reset your password:</p><p><a href="${resetLink}">Reset Password</a></p><p>This link will expire in 1 hour.</p>`,
    });
  }

  async sendOrderConfirmationEmail(order: Order): Promise<void> {
    const itemsHtml = order.items.map(item => 
      `<li>${item.productName} (${item.variationDetails}) x${item.quantity} - ${item.price * item.quantity} грн</li>`
    ).join('');
 
    await this.resend.emails.send({
      from: this.configService.get<string>('RESEND_FROM_EMAIL') || 'onboarding@resend.dev',
      to: order.shippingAddress.email,
      subject: `Замовлення #${order.orderNumber} прийнято!`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4f46e5;">Дякуємо за замовлення!</h2>
          <p>Ваше замовлення <strong>#${order.orderNumber}</strong> успішно оформлено і вже в роботі.</p>
          <div style="background: #f9fafb; padding: 20px; border-radius: 12px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Деталі замовлення:</h3>
            <ul style="list-style: none; padding: 0;">${itemsHtml}</ul>
            <div style="text-align: right; font-weight: bold; font-size: 1.2em; margin-top: 10px; border-top: 1px solid #ddd; padding-top: 10px;">
              Разом: ${order.totalAmount} грн
            </div>
          </div>
          <p>Ми повідомимо вас, як тільки замовлення змінить статус.</p>
          <p>З повагою, <br>Whiskers & Bows 🐾</p>
        </div>
      `,
    });
  }


  async sendOrderStatusUpdateEmail(order: Order): Promise<void> {
    await this.resend.emails.send({
      from: this.configService.get<string>('RESEND_FROM_EMAIL') || 'onboarding@resend.dev',
      to: order.shippingAddress.email,
      subject: `Статус замовлення #${order.orderNumber} оновлено`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4f46e5;">Оновлення статусу замовлення</h2>
          <p>Статус вашого замовлення <strong>#${order.orderNumber}</strong> змінився на: <strong style="color: #4f46e5;">${order.status}</strong></p>
          <p>Ми продовжуємо працювати над вашим замовленням!</p>
          <p>З повагою, <br>Whiskers & Bows 🐾</p>
        </div>
      `,
    });
  }
}

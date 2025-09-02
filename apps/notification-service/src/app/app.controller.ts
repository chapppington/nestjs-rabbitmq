import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern('order-created')
  sendOrderCreatedNotification(@Payload() order: any) {
    console.log('[Notification Microservice] Notifying order created: ', order);
  }

  @MessagePattern('payment-succeed')
  sendPaymentSucceedNotification(@Payload() order: any) {
    console.log('[Notification Microservice] Notifying payment succeed: ', order);
  }
}

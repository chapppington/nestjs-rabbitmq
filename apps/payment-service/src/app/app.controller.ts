import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject('NOTIFICATION_CLIENT') private readonly notificationRMQClient: ClientProxy,
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern('process-payment')
  handleProcessPayment(@Payload() order: any) {
    console.log('[Payment Microservice] Received new order to process: ', order);

    this.notificationRMQClient.emit('payment-succeed', order);
  }
}

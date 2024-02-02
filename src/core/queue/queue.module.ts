import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('queueConfig'),
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueueAsync({
      name: 'mailSending',
    }),
  ],
  providers: [],
  exports: [BullModule],
})
export class QueueModule {}

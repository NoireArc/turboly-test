import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule,

    JwtModule.register({
      secret: 'SUPER_SECRET_KEY',
    }),
  ],

  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule { }
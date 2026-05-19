import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from './database/database.services';

@Controller()
export class AppController {
  constructor(private db: DatabaseService) { }

}
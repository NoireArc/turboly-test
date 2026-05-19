import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Tasks')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
    constructor(
        private tasksService: TasksService,
    ) { }

    @Post()
    create(@Body() body: CreateTaskDto) {
        return this.tasksService.createTask(body);
    }

    @Get()
    getAll(
        @Query('sort') sort?: string,
    ) {
        return this.tasksService.getTasks(sort);
    }

    @Patch(':id')
    complete(@Param('id') id: string) {
        return this.tasksService.completeTask(id);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.tasksService.deleteTask(id);
    }
}
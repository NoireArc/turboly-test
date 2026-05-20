import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
    constructor(
        private readonly tasksService: TasksService,
    ) { }

    @Post()
    create(
        @Body() body: CreateTaskDto,
        @Req() req: any,
    ) {
        return this.tasksService.createTask(
            body,
            req.user.userId,
        );
    }

    @Get()
    getAll(
        @Query('sort') sort?: string,
        @Req() req?: any,
    ) {
        return this.tasksService.getTasks(
            sort,
            req.user.userId,
        );
    }

    @Patch(':id')
    toggle(
        @Param('id') id: string,
    ) {
        return this.tasksService.toggleTask(
            Number(id),
        );
    }

    @Delete(':id')
    delete(
        @Param('id') id: string,
    ) {
        return this.tasksService.deleteTask(
            Number(id),
        );
    }
}
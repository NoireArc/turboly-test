import { Injectable } from '@nestjs/common';

import { DatabaseService } from 'src/database/database.services';

@Injectable()
export class TasksService {
    constructor(private db: DatabaseService) { }

    async createTask(body: any) {
        await this.db.query(
            `
      INSERT INTO tasks
      (title, description, due_date, priority, user_id)
      VALUES (?, ?, ?, ?, ?)
      `,
            [
                body.title,
                body.description,
                body.due_date,
                body.priority,
                body.user_id,
            ],
        );

        return {
            message: 'Task created',
        };
    }

    async getTasks(sort?: string) {
        const allowedSort = [
            'due_date',
            'priority',
            'title',
        ];

        const sortField = allowedSort.includes(
            sort || '',
        )
            ? sort
            : 'due_date';

        const [tasks] = await this.db.query(
            `
      SELECT * FROM tasks
      ORDER BY ${sortField} ASC
      `,
        );

        return tasks;
    }

    async completeTask(id: string) {
        await this.db.query(
            `
      UPDATE tasks
      SET completed = NOT completed
      WHERE id = ?
      `,
            [id],
        );

        return {
            message: 'Task updated',
        };
    }

    async deleteTask(id: string) {
        await this.db.query(
            `
      DELETE FROM tasks
      WHERE id = ?
      `,
            [id],
        );

        return {
            message: 'Task deleted',
        };
    }
}
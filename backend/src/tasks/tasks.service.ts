import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.services';

@Injectable()
export class TasksService {
    constructor(
        private readonly db: DatabaseService,
    ) { }

    async createTask(
        body: any,
        userId: number,
    ) {
        await this.db.query(`INSERT INTO tasks (title, description, due_date, priority, user_id) VALUES (?, ?, ?, ?, ?)`,
            [
                body.title,
                body.description,
                body.due_date,
                body.priority,
                userId,
            ],
        );

        return {
            message: 'Task created',
        };
    }

    async getTasks(
        sort?: string,
        userId?: number,
    ) {
        const allowedSort = [
            'due_date',
            'priority',
            'title',
        ];

        const sortField =
            allowedSort.includes(sort || '')
                ? sort
                : 'due_date';

        let query = `
    SELECT * FROM tasks
    WHERE user_id = ?
    `;

        if (sortField === 'priority') {
            query += `
        ORDER BY
        CASE
            WHEN priority = 'high' THEN 1
            WHEN priority = 'medium' THEN 2
            WHEN priority = 'low' THEN 3
        END
        `;
        } else {
            query += `
        ORDER BY ${sortField} ASC
        `;
        }

        const [tasks] = await this.db.query(
            query,
            [userId],
        );

        return tasks;
    }

    async toggleTask(id: number) {
        await this.db.query(`UPDATE tasks SET completed = NOT completed WHERE id = ?`, [id],);
        return {
            message: 'Task updated',
        };
    }

    async deleteTask(id: number) {
        await this.db.query(`DELETE FROM tasks WHERE id = ?`, [id],);
        return {
            message: 'Task deleted',
        };
    }
}
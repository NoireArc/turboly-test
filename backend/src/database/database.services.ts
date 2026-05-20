import { Injectable } from '@nestjs/common';

import * as mysql from 'mysql2/promise';

@Injectable()
export class DatabaseService {
    private pool;

    constructor() {
        this.pool = mysql.createPool({
            host: process.env.DB_HOST,

            port: Number(
                process.env.DB_PORT,
            ),

            user: process.env.DB_USER,

            password:
                process.env.DB_PASSWORD,

            database: process.env.DB_NAME,

            waitForConnections: true,

            connectionLimit: 10,
        });
    }

    query(sql: string, params?: any[]) {
        return this.pool.execute(sql, params);
    }
}
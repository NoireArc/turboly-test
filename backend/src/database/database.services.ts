import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

@Injectable()
export class DatabaseService {
    private pool;

    constructor() {
        this.pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'turboly-test',
            waitForConnections: true,
            connectionLimit: 10,
        });
    }

    query(sql: string, params?: any[]) {
        return this.pool.execute(sql, params);
    }
}
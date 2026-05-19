import {
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { DatabaseService } from 'src/database/database.services';

@Injectable()
export class AuthService {
    constructor(
        private db: DatabaseService,
        private jwt: JwtService,
    ) { }

    async register(email: string, password: string) {
        const hashedPassword = await bcrypt.hash(
            password,
            10,
        );

        await this.db.query(
            `
      INSERT INTO users(email, password)
      VALUES (?, ?)
      `,
            [email, hashedPassword],
        );

        return {
            message: 'Register success',
        };
    }

    async login(email: string, password: string) {
        const [rows]: any = await this.db.query(
            `
      SELECT * FROM users
      WHERE email = ?
      `,
            [email],
        );

        const user = rows[0];

        if (!user) {
            throw new UnauthorizedException(
                'Invalid credentials',
            );
        }

        const valid = await bcrypt.compare(
            password,
            user.password,
        );

        if (!valid) {
            throw new UnauthorizedException(
                'Invalid credentials',
            );
        }

        const token = this.jwt.sign({
            userId: user.id,
            email: user.email,
        });

        return {
            access_token: token,
        };
    }
}
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class CheckHostGuard implements CanActivate {
    constructor(@InjectKnex() private readonly knex: Knex) {}
    async canActivate(context: ExecutionContext) {
        const req: Request = context.switchToHttp().getRequest();
        let domain = req.headers.origin;
        const email = req.body.email;
        if (domain) {
            if (domain.startsWith('https')) {
                domain = domain.substring(8);
            }
        }

        try {
            if (domain) {
                const university = await this.knex('universities')
                    .where({ domain })
                    .first()
                    .returning('id')
                    .select('id');
                const user = await this.knex('users').where({ email }).first();

                if (!university || !user)
                    throw new UnauthorizedException(`Invalid credentials`);
                const isMatch = await this.knex('university_admins')
                    .where({
                        user_id: user['id'],
                        university_id: university['id'],
                    })
                    .first();

                if (isMatch) return true;
                throw new UnauthorizedException(`Invalid credentials`);
            } else {
                throw new UnauthorizedException(`Invalid credentials`);
            }
        } catch (error) {
            throw error;
        }
    }
}

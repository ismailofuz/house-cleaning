import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class CheckUniversityAdminGuard implements CanActivate {
    constructor(@InjectKnex() private readonly knex: Knex) {}
    async canActivate(context: ExecutionContext) {
        const req: Request = context.switchToHttp().getRequest();
        let domain = req.headers.origin;
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
                if (university) {
                    return true;
                } else {
                    throw new BadRequestException();
                }
            } else {
                throw new BadRequestException();
            }
        } catch (error) {
            throw error;
        }
    }
}

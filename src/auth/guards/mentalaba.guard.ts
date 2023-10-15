import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class MentalabaGuard implements CanActivate {
    constructor(@InjectKnex() private readonly knex: Knex) {}
    async canActivate(context: ExecutionContext) {
        const req: Request = context.switchToHttp().getRequest();
        const domain = req.headers.origin;

        try {
            if (
                domain == 'https://mentalaba.uz' ||
                domain == 'https://menstudent.uz'
            ) {
                return true;
            } else {
                throw new BadRequestException();
            }
        } catch (error) {
            throw error;
        }
    }
}

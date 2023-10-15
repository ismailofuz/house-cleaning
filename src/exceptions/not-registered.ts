import { HttpException } from '@nestjs/common';

export class NotRegisteredException extends HttpException {
    constructor(message: string, code: number) {
        super(message, code);
    }
}

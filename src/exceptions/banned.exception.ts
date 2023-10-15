import { HttpException } from '@nestjs/common';

export class BannedException extends HttpException {
    constructor(message: string, code: number) {
        super(message, code);
    }
}

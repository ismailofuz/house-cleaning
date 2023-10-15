import { HttpException } from '@nestjs/common';

export class NoAppFormException extends HttpException {
    constructor(message: string) {
        super(message, 604);
    }
}

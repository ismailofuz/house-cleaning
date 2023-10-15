import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway(3051, { cors: true })
export class MyGateway {
    private logger = new Logger(MyGateway.name);
    constructor(private jwt: JwtService, private config: ConfigService) {}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleConnection(client: Socket, ...args: any[]) {
        try {
            const payload = this.jwt.verify(
                client.handshake.headers.authorization,
                {
                    secret: this.config.get('jwt.secret'),
                    ignoreExpiration: false,
                },
            );
            client['user'] = payload.user;
        } catch (error) {
            this.logger.error(error);
            client.disconnect();
            return error;
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @SubscribeMessage('newMessage')
    async onNewMessage(@MessageBody() body: any) {
        console.log(body);
    }

    /**
     * serverni socket.io dan oladi
     */
    @WebSocketServer()
    server: Server;

    /**
     *  nasib bo'lsa shuni hamma joyda chaqirib shu orqali xabarni emit qip yuborsa bo'ladi
     * @param eventName event name
     * @param message
     */
    async sendMessage(eventName: string, message: string) {
        this.server.setMaxListeners(15);
        this.server.emit(eventName, message);
    }
}

/**
 * for working this one use commands :
 *
 *   ---       yarn remove @nestjs/core
 *   ---      yarn add @nestjs/core
 */

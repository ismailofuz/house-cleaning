import { Module } from '@nestjs/common';
import { MyGateway } from './gateway';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
    providers: [MyGateway, JwtService, ConfigService],
})
export class GatewayModule {}

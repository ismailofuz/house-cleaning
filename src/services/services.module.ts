import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { ServicesRepository } from 'src/repository/classes/services';

@Module({
    controllers: [ServicesController],
    providers: [ServicesService, ServicesRepository],
})
export class ServicesModule {}

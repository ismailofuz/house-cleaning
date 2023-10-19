import { Module } from '@nestjs/common';
import { ContestsService } from './contests.service';
import { ContestsController } from './contests.controller';
import { ContestsRepository } from 'src/repository/classes/contests';

@Module({
    controllers: [ContestsController],
    providers: [ContestsService, ContestsRepository],
})
export class ContestsModule {}

import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { SubjectRepository } from 'src/repository/classes/subjects';

@Module({
    controllers: [SubjectsController],
    providers: [SubjectsService, SubjectRepository],
})
export class SubjectsModule {}

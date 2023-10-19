import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { SubjectRepository } from 'src/repository/classes/subjects';
import { SubjectsQueryDto } from './dto/subjects-query.dto';

@Injectable()
export class SubjectsService {
    constructor(private readonly repository: SubjectRepository) {}

    create(createSubjectDto: CreateSubjectDto) {
        return this.repository.createSection(createSubjectDto);
    }

    findAll(query: SubjectsQueryDto) {
        return this.repository.findSubjects(query);
    }

    findOne(id: number) {
        return this.repository.findOneSubject(id);
    }

    update(id: number, updateSubjectDto: UpdateSubjectDto) {
        return this.repository.updateSubject(id, updateSubjectDto);
    }

    remove(id: number) {
        return this.repository.deleteSubject(id);
    }
}

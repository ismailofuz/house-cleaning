import { SectionI, SubjectI, ThemeI } from 'src/common/types/interfaces';
import { CreateSubjectDto } from 'src/subjects/dto/create-subject.dto';
import { UpdateSubjectDto } from 'src/subjects/dto/update-subject.dto';
import SubjectRepositoryI, {
    SectionQuery,
    SubjectQuery,
    ThemeQuery,
} from '../interfaces/subjects';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CreateThemeDto } from 'src/subjects/dto/create-theme.dto';
import { UpdateSectionDto } from 'src/subjects/dto/update-section.dto';
import { UpdateThemeDto } from 'src/subjects/dto/update-theme.dto';

export class SubjectRepository implements SubjectRepositoryI {
    constructor(@InjectKnex() private readonly knex: Knex) {}

    private get subject() {
        return this.knex<SubjectI>('subjects');
    }

    private get section() {
        return this.knex<SubjectI>('sections');
    }

    private get theme() {
        return this.knex<SubjectI>('themes');
    }

    baseQuery = this.subject;

    async createSubject(dto: CreateSubjectDto): Promise<SubjectI> {
        return this.baseQuery
            .clone()
            .insert(dto)
            .returning('*')
            .then(async (res) => {
                return res[0];
            });
    }

    updateSubject(id: number, dto: UpdateSubjectDto): Promise<number> {
        return this.baseQuery
            .clone()
            .where({ id })
            .update({ ...dto });
    }

    async findSubjects(query: SubjectQuery): Promise<any> {
        const { q, page } = query;

        let q_uz: string;
        let q_ru: string;
        if (q) {
            let q_replace = q.replace(/\s+/g, ' ').trim();
            q_replace = q_replace.replace(/['‘’`]/g, '‘');
            if (/[\w\s,.!?'"’‘`-]+/g.test(q_replace)) {
                q_uz = q_replace;
            } else if (/^[а-яА-Я ]+$/.test(q_replace)) {
                q_ru = q_replace;
            }
        }

        const dbQuery = this.baseQuery
            .clone()
            .select(
                'subjects.id',
                'subjects.name_uz',
                'subjects.name_ru',
                'subjects.name_en',
            )
            .orderBy('name_uz', 'asc')
            .groupBy('subjects.id');

        const totalCount = (
            await dbQuery.clone().groupBy('subjects.id').count()
        ).length;

        if (q_uz) {
            dbQuery.where(function () {
                this.orWhereILike('subjects.name_uz', `%${q_uz}%`);
            });
        }

        if (q_ru) {
            dbQuery.where(function () {
                this.orWhereILike('subjects.name_ru', `%${q_ru}%`);
            });
        }

        const currentCount = (
            await dbQuery.clone().groupBy('subjects.id').count()
        ).length;

        if (page) {
            dbQuery.offset(page.offset).limit(page.limit);
        }

        dbQuery.orderBy('id');

        const subjects = await dbQuery;

        return {
            entities: subjects,
            pageInfo: {
                currentCount,
                totalCount,
                offset: page ? page.offset : null,
                limit: page ? page.limit : null,
            },
        };
    }

    findOneSubject(id: number): Promise<SubjectI> {
        return this.baseQuery.clone().where({ id }).first();
    }

    deleteSubject(id: number): Promise<number> {
        return this.baseQuery.clone().where({ id }).del();
    }

    createSection(dto: CreateSubjectDto): Promise<SubjectI> {
        throw new Error('Method not implemented.');
    }

    updateSection(id: number, dto: UpdateSectionDto): Promise<number> {
        throw new Error('Method not implemented.');
    }

    findSections(query: SectionQuery): Promise<any> {
        throw new Error('Method not implemented.');
    }

    findOneSection(id: number): Promise<SectionI> {
        throw new Error('Method not implemented.');
    }

    deleteSection(id: number): Promise<number> {
        throw new Error('Method not implemented.');
    }

    createTheme(dto: CreateThemeDto): Promise<ThemeI> {
        throw new Error('Method not implemented.');
    }

    updateTheme(id: number, dto: UpdateThemeDto): Promise<number> {
        throw new Error('Method not implemented.');
    }

    findThemes(query: ThemeQuery): Promise<any> {
        throw new Error('Method not implemented.');
    }

    findOneTheme(id: number): Promise<ThemeI> {
        throw new Error('Method not implemented.');
    }

    deleteTheme(id: number): Promise<number> {
        throw new Error('Method not implemented.');
    }
}

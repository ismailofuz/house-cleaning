import {
    OffsetPaginationI,
    SectionI,
    SubjectI,
    ThemeI,
} from 'src/common/types/interfaces';
import { CreateSectionDto } from 'src/subjects/dto/create-section.dto';
import { CreateSubjectDto } from 'src/subjects/dto/create-subject.dto';
import { CreateThemeDto } from 'src/subjects/dto/create-theme.dto';
import { UpdateSectionDto } from 'src/subjects/dto/update-section.dto';
import { UpdateSubjectDto } from 'src/subjects/dto/update-subject.dto';
import { UpdateThemeDto } from 'src/subjects/dto/update-theme.dto';

export type CreateSubject = CreateSubjectDto;
export type UpdateSubject = UpdateSubjectDto;
export type SubjectQuery = {
    q?: string;
    page?: OffsetPaginationI;
};

export type CreateSection = CreateSectionDto;
export type UpdateSection = UpdateSectionDto;
export type SectionQuery = {
    q?: string;
    page?: OffsetPaginationI;
};

export type CreateTheme = CreateThemeDto;
export type UpdateTheme = UpdateThemeDto;
export type ThemeQuery = {
    q?: string;
    page?: OffsetPaginationI;
};

export default interface SubjectRepositoryI {
    createSubject(dto: CreateSubject): Promise<SubjectI>;
    updateSubject(id: number, dto: UpdateSubject): Promise<number>;
    findSubjects(query: SubjectQuery): Promise<any>;
    findOneSubject(id: number): Promise<SubjectI>;
    deleteSubject(id: number): Promise<number>;

    createSection(dto: CreateSubject): Promise<SubjectI>;
    updateSection(id: number, dto: UpdateSection): Promise<number>;
    findSections(query: SectionQuery): Promise<any>;
    findOneSection(id: number): Promise<SectionI>;
    deleteSection(id: number): Promise<number>;

    createTheme(dto: CreateTheme): Promise<ThemeI>;
    updateTheme(id: number, dto: UpdateTheme): Promise<number>;
    findThemes(query: ThemeQuery): Promise<any>;
    findOneTheme(id: number): Promise<ThemeI>;
    deleteTheme(id: number): Promise<number>;
}

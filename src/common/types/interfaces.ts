import {
    ContestStatus,
    ContestType,
    DeviceType,
    MediaFileAssociations,
    MediaFileStatus,
    MediaFileUsages,
    Role,
} from './enums';

export interface UserI {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    region_id: number;
    district_id: number;
    password: string;
    birth_date: Date;
    avatar: string | null;
    role: Role;
    is_verify: boolean;
    created_at: Date;
}

export interface VerificationV2I {
    phone: string;
    email: string;
    first_name: string;
    password: string;
    code: number;
    attempt_count: number;
    expiresIn: Date;
}

export interface DeviceI {
    id?: number;
    name: string;
    type: DeviceType;
    token: string;
    device_id: string;
    user_id: number;
    last_logged_in?: Date;
    is_active?: boolean;
    created_at?: Date;
    updated_at?: string;
}

export interface VerificationI {
    id: string;
    phone: string;
    code: number;
    expires_at: Date;
}

export interface SubjectI {
    id: number;
    name_uz: string;
    name_ru: string;
    name_en: string;
    photo: string;
}

export interface ContestI {
    id: number;
    name_uz: string;
    name_ru: string;
    name_en: string;
    description_uz: string;
    description_ru: string;
    description_en: string;
    powered_by: number;
    starts_at: Date;
    contest_type: ContestType;
    questions_count: number;
    code: string;
    first_place_prize: number;
    second_place_prize: number;
    third_place_prize: number;
    status: ContestStatus;
}

export interface SectionI {
    id: number;
    name_uz: string;
    name_ru: string;
    name_en: string;
    subject_id: string;
}

export interface ThemeI {
    id: number;
    name_uz: string;
    name_ru: string;
    name_en: string;
    section_id: string;
}

export interface MediaFileMetadataI {
    id: number;
    file_name: string;
    file_size: number;
    file_mimetype: string;
    file_path: string;
    associated_with: MediaFileAssociations;
    usage: MediaFileUsages;
    status: MediaFileStatus;
    created_at: string;
}

export interface CursorPaginationI {
    first?: number;
    after?: number;
    last?: number;
    before?: number;
}

export interface OffsetPaginationI {
    offset: number;
    limit: number;
}

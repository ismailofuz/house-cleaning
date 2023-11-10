import {
    CategoryType,
    DeviceType,
    MediaFileAssociations,
    MediaFileStatus,
    MediaFileUsages,
    NotificationType,
    OrderStatus,
    Role,
    ServiceUnit,
    Status,
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

export interface CustomerOrderI {
    id: number;
    phone: string;
    name: string;
    address: string;
    service_id: number;
    status?: OrderStatus;
    created_at?: Date;
    updated_at?: Date;
}

export interface ServicesI {
    id: number;
    category_id: number;
    name_uz: string;
    name_ru: string;
    name_en: string;
    description_uz: string;
    description_ru: string;
    description_en: string;
    unit_uz: ServiceUnit;
    unit_ru: ServiceUnit;
    unit_en: ServiceUnit;
    icon: string;
    image: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface ServiceCategoriesI {
    id: number;
    name_uz: string;
    name_ru: string;
    name_en: string;
    type: CategoryType;
    created_at?: Date;
    updated_at?: Date;
}

export interface NotificationI {
    id?: number;
    user_id?: number;
    is_read?: boolean;
    message: string;
    type: NotificationType;
    created_at?: Date;
    status?: Status;
    is_for_all: boolean;
    updated_at?: Date;
}
export interface VerificationI {
    id: string;
    phone: string;
    code: number;
    expires_at: Date;
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

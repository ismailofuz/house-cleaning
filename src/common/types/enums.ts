export enum Role {
    SUPER_ADMIN = 'super_admin',
    ADMIN = 'admin',
    USER = 'user',
}

export enum DeviceType {
    iOS = 'ios',
    ANDROID = 'android',
    WINDOWS = 'windows',
}

export enum ContestType {}

export enum ContestStatus {
    PENDING = 'pending',
    PROCESS = 'process',
    FINISHED = 'finished',
}

export enum MediaFileAssociations {
    USER = 'users',
    QUIZ = 'quiz',
    BADGE = 'badge',
}

export enum MediaFileUsages {
    AVATAR = 'avatar',
    BANNER = 'banner',
    BOOK = 'book',
    TEST = 'test',
    UNIVERSITY = 'university_logo',
    NOTIFICATIONS_ICON = 'notification_icon',
}

export enum MediaFileStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}

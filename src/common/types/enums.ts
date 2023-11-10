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

export enum OrderStatus {
    PENDING = 'pending',
    CONTACTED = 'contacted',
}

export enum ServiceUnit {
    ROOM = 'room',
}

export enum CategoryType {
    MAIN = 'main',
    EXTERNAL = 'external',
}

export enum MediaFileAssociations {
    USER = 'users',
    QUIZ = 'categories',
    BADGE = 'services',
    GALLERY = 'gallery',
}

export enum Events {
    NEWS = 'news',
}

export enum Status {
    ACTIVE = 'active',
    NON_ACTIVE = 'non-active',
    DELETED = 'deleted',
}

export enum NotificationType {
    WEB = 'web',
    MOBILE = 'mobile',
}

export enum MediaFileUsages {
    AVATAR = 'avatar',
    ICON = 'icon',
    IMAGE = 'image',
    GALLERY_PHOTO = 'gallery_photo',
    GALLERY_VIDEO = 'gallery_video',
    NOTIFICATIONS_ICON = 'notification_icon',
}

export enum MediaFileStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}

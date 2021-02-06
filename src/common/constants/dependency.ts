export enum Dependency {
    DATABASE_SERVICE = 'PrismaService',
    EMAIL_SERVICE = 'NodemailerEmailService',
    EVENT_SERVICE = 'EventService',
    GOOGLE_API_SERVICE = 'GoogleApiService',
    FILE_SERVICE = 'FileService',
    HASH_SERVICE = 'BcryptService',
    HTTP_SERVICE = 'AxiosService',
    TOKEN_SERVICE = 'JwtTokenService',
    REDIS_SERVICE = 'RedisService',
    VALIDATION_SERVICE = 'ValidationService',

    CACHE_MANAGER = 'CACHE_MANAGER',
    CLOUD_PROVIDER = 'CloudinaryProvider',

    REDIS_CACHE_CLIENT = 'REDIS_CACHE_CLIENT',
    REDIS_PUBLISHER_CLIENT = 'REDIS_PUBLISHER_CLIENT',
    REDIS_SUBSCRIBER_CLIENT = 'REDIS_SUBSCRIBER_CLIENT'
}

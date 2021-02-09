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
    QUOTE_API_SERVICE = 'QuoteApiService',

    CLOUD_PROVIDER = 'CloudinaryProvider',
    REDIS_CLIENT = 'REDIS_CLIENT'
}

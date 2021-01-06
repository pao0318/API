enum InjectionType {
    AUTH_CONTROLLER = 'AuthController',
    AUTH_ROUTER = 'AuthRouter',
    AUTH_SERVICE = 'AuthService',

    USER_REPOSITORY = 'UserRepository',
    MONGO_USER_MODEL = 'MongoUserModel',
    USER_SEEDER = 'UserSeeder',

    MAIL_SERVICE = 'MailService',
    MAIL_PROVIDER = 'MailProvider'
}

export default InjectionType;
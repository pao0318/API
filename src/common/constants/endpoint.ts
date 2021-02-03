export const Endpoint = {
    AUTH: {
        REGISTER: '/auth/new-account',
        LOGIN_EMAIL: '/auth/email',
        LOGIN_GOOGLE: '/auth/google',
        LOGIN_FACEBOOK: '/auth/facebook',
        LOGOUT: '/auth/logout',
    },
    BOOK: {
        GET_BY_ISBN: '/book/isbn/:isbn',
        CREATE: '/book',
    },
    MAIL: {
        EMAIL_CONFIRMATION: '/mail/email-confirmation',
        PASSWORD_RESET: '/mail/password-reset',
    },
    USER: {
        AVATAR: {
            UPDATE: '/user/avatar',
        },
        EMAIL: {
            CONFIRM: '/user/email',
        },
        PASSWORD: {
            UPDATE: '/user/password',
        },
    },
} as const;

export const Endpoint = {
    AUTH: {
        REGISTER: '/auth/new-account',
        LOGIN_EMAIL: '/auth/email',
        LOGIN_GOOGLE: '/auth/google',
        LOGIN_FACEBOOK: '/auth/facebook',
        LOGOUT: '/auth/logout'
    },
    BOOK: {
        GET_DATA_BY_ISBN: '/book/data/isbn/:isbn'
    },
    MAIL: {
        CONFIRIM_EMAIL: '/mail/email-confirmation',
        RESET_PASSWORD: '/mail/password-reset'
    },
    USER: {
        AVATAR: {
            UPDATE: '/user/avatar'
        },
        EMAIL: {
            CONFIRM: '/user/email'
        },
        PASSWORD: {
            UPDATE: '/user/password'
        }
    },
    QUOTE: {
        GET: '/quote'
    }
} as const;

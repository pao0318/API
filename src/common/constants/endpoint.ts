export const Endpoint = {
    AUTH: {
        REGISTER: '/auth/new-account',
        LOGIN_EMAIL: '/auth/email',
        LOGIN_GOOGLE: '/auth/google',
        LOGIN_FACEBOOK: '/auth/facebook',
        LOGOUT: '/auth/logout'
    },
    BOOK: {
        GET_DATA_BY_ISBN: '/book/data/isbn/:isbn',
        GET_DATA_BY_TITLE: '/book/data/title/:title',
        CREATE: '/book'
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
        },
        LOCATION: {
            UPDATE: '/user/location'
        }
    },
    QUOTE: {
        GET: '/quote'
    }
} as const;

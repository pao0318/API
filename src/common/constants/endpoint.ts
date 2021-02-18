export const Endpoint = {
    AUTH: {
        REGISTER: '/auth/new-account',
        LOGIN_EMAIL: '/auth/email',
        LOGIN_GOOGLE: '/auth/google',
        LOGIN_FACEBOOK: '/auth/facebook',
        LOGOUT: '/auth/logout'
    },
    BOOK: {
        DATA: {
            GET_BY_ISBN: '/book/data/isbn/:isbn',
            GET_BY_TITLE: '/book/data/title/:title'
        },
        EXCHANGE: {
            BORROW: '/book/borrow'
        },
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
        IDENTITY: {
            UPDATE: '/user/identity'
        },
        LOCATION: {
            UPDATE: '/user/location'
        },
        PASSWORD: {
            UPDATE: '/user/password'
        },
        PREFERENCE: {
            UPDATE: '/user/preference'
        }
    },
    QUOTE: {
        GET: '/quote'
    }
} as const;

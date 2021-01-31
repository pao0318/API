export const Endpoint = {
    AUTH: {
        NEW_ACCOUNT: '/auth/new-account',
        EMAIL: '/auth/email',
        GOOGLE: '/auth/google',
        FACEBOOK: '/auth/facebook',
        LOGOUT: '/auth/logout',
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
            UPDATE: '/user/email',
        },
        PASSWORD: {
            UPDATE: '/user/password',
        },
    },
} as const;

export const Endpoint = {
    AUTH: {
        REGISTER: '/auth/register',
        LOGIN: '/auth/email',
        LOGIN_GOOGLE: '/auth/google',
        LOGIN_FACEBOOK: '/auth/facebook',
        LOGOUT: '/auth/logout',
    },
    ACCOUNT: {
        CONFIRM_EMAIL: '/account/email-confirmation',
        RESET_PASSWORD: '/account/password-reset',
        SEND_ACCOUNT_CONFIRMATION_MAIL: '/account/send-account-confirmation-mail',
        SEND_RESET_PASSWORD_CONFIRMATION_MAIL: '/account/password-reset',
    },
    EMAIL: {
        ACCOUNT_CONFIRMATION: '/email/account-confirmation',
        PASSWORD_RESET: '/email/password-reset',
    },
    USER: {
        AVATAR: '/user/avatar',
        EMAIL: {
            SEND_ACCOUNT_CONFIRMATION_MAIL: '/user/email/confirmation/send',
        },
    },
} as const;

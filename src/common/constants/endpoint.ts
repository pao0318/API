export const Endpoint = {
    AUTH: {
        REGISTER: '/auth/register',
        LOGIN: '/auth/login',
        LOGIN_GOOGLE: '/auth/login-google',
        LOGIN_FACEBOOK: '/auth/login-facebook'
    },
    ACCOUNT: {
        CHANGE_PASSWORD: '/account/change-password',
        CONFIRM_EMAIL: '/account/confirm-email',
        RESET_PASSWORD: '/account/reset-password',
        SEND_CONFIRMATION_MAIL: '/account/send-confirmation-mail'
    }
} as const;
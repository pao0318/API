import { AccountType } from './account-type';
import { AppMode } from './app-mode';
import { DefaultException } from './default-exception';
import { Dependency } from './dependency';
import { Endpoint } from './endpoint';
import { Exception } from './exception';
import { StatusCode } from './status-code';
import { Token } from './token';

export const Constants = {
    ACCOUNT_TYPE: AccountType,
    APP_MODE: AppMode,
    DEFAULT_EXCEPTION: DefaultException,
    DEPENDENCY: Dependency,
    ENDPOINT: Endpoint,
    EXCEPTION: Exception,
    STATUS_CODE: StatusCode,
    TOKEN: Token
} as const;
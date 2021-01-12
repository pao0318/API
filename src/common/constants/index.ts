import { AccountType } from './account-type';
import { AppMode } from './app-mode';
import { Color } from './color';
import { DefaultException } from './default-exception';
import { Dependency } from './dependency';
import { Endpoint } from './endpoint';
import { Exception } from './exception';
import { StatusCode } from './status-code';
import { Task } from './task';
import { Time } from './time';
import { Token } from './token';

export const Constants = {
    ACCOUNT_TYPE: AccountType,
    APP_MODE: AppMode,
    COLOR: Color,
    DEFAULT_EXCEPTION: DefaultException,
    DEPENDENCY: Dependency,
    ENDPOINT: Endpoint,
    EXCEPTION: Exception,
    STATUS_CODE: StatusCode,
    TASK: Task,
    TIME: Time,
    TOKEN: Token
} as const;
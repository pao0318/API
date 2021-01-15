import { AccountType } from './account-type';
import { AppMode } from './app-mode';
import { Color } from './color';
import { DefaultException } from './default-exception';
import { Dependency } from './dependency';
import { Endpoint } from './endpoint';
import { Event } from './event';
import { Exception } from './exception';
import { StatusCode } from './status-code';
import { Task } from './task';
import { Time } from './time';

export const Constants = {
    ACCOUNT_TYPE: AccountType,
    APP_MODE: AppMode,
    COLOR: Color,
    DEFAULT_EXCEPTION: DefaultException,
    DEPENDENCY: Dependency,
    ENDPOINT: Endpoint,
    EVENT: Event,
    EXCEPTION: Exception,
    STATUS_CODE: StatusCode,
    TASK: Task,
    TIME: Time,
} as const;
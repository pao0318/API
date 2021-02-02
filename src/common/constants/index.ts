import { DefaultException } from './default-exception';
import { Dependency } from './dependency';
import { Endpoint } from './endpoint';
import { Event } from './event';
import { Exception } from './exception';
import { Image } from './image';
import { StatusCode } from './status-code';
import { Task } from './task';
import { Time } from './time';
import { Url } from './url';

export const Constants = {
    DEFAULT_EXCEPTION: DefaultException,
    DEPENDENCY: Dependency,
    ENDPOINT: Endpoint,
    EVENT: Event,
    EXCEPTION: Exception,
    IMAGE: Image,
    STATUS_CODE: StatusCode,
    TASK: Task,
    TIME: Time,
    URL: Url,
} as const;

import { Redis } from './redis';
import { DefaultException } from './default-exception';
import { Dependency } from './dependency';
import { Endpoint } from './endpoint';
import { Exception } from './exception';
import { Image } from './image';
import { StatusCode } from './status-code';
import { Task } from './task';
import { Time } from './time';
import { Url } from './url';

export const Constants = {
    REDIS: Redis,
    DEFAULT_EXCEPTION: DefaultException,
    DEPENDENCY: Dependency,
    ENDPOINT: Endpoint,
    EXCEPTION: Exception,
    IMAGE: Image,
    STATUS_CODE: StatusCode,
    TASK: Task,
    TIME: Time,
    URL: Url
} as const;

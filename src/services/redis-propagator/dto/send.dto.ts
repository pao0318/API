import { RedisSocketEventEmitDto } from './emit.dto';

export class RedisSocketEventSendDto extends RedisSocketEventEmitDto implements Readonly<RedisSocketEventSendDto> {
    public event: string;
    public data: unknown;
}

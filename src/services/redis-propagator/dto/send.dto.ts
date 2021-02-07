import { RedisSocketEventEmitDto } from './emit.dto';

export class RedisSocketEventSendDto extends RedisSocketEventEmitDto implements Readonly<RedisSocketEventSendDto> {
    public userId: string;
    public socketId: string;
}

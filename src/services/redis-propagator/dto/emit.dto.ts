export class RedisSocketEventEmitDto implements Readonly<RedisSocketEventEmitDto> {
    public event: string;
    public data: unknown;
}

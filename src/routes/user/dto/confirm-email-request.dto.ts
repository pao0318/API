export class ConfirmEmailRequestDto implements Readonly<ConfirmEmailRequestDto> {
    public email: string;
    public code: string;
}

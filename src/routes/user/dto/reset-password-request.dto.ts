export class ResetPasswordRequestDto implements Readonly<ResetPasswordRequestDto> {
    public email: string;
    public password: string;
    public code: string;
}

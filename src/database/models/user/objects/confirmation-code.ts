import { randomBytes } from 'crypto';
import { Constants } from '../../../../common/constants';

export class ConfirmationCode {
    private readonly _code: string;
    private readonly _expiresAt: number;

    constructor(code: string, expiresAt: number) {
        this._code = code;
        this._expiresAt = expiresAt;
    }  

    public get code(): string {
        return this._code;
    }

    public get expiresAt(): number {
        return this._expiresAt;
    }
    
    public static generate(): ConfirmationCode {
        return new ConfirmationCode(this._generateCode(), this._generateExpiresAt());
    }

    private static _generateCode(): string {
        return randomBytes(20).toString('hex').substr(8, 6);
    }

    private static _generateExpiresAt(): number {
        return Date.now() + Constants.TIME.MINUTES_30
    }
}
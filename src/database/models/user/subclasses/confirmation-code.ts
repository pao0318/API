import { randomBytes } from 'crypto';
import { Constants } from '../../../../common/constants';

export class ConfirmationCode {
    constructor(
        public readonly code: string,
        public readonly expiresAt: number,
    ) {}

    public isExpired(): boolean {
        return Date.now() > this.expiresAt;
    }

    public static generate(): ConfirmationCode {
        return new ConfirmationCode(
            this._generateCode(),
            this._generateExpiresAt(),
        );
    }

    public static generateEmpty(): ConfirmationCode {
        return new ConfirmationCode('', Date.now());
    }

    private static _generateCode(): string {
        return randomBytes(20).toString('hex').substr(8, 6);
    }

    private static _generateExpiresAt(): number {
        return Date.now() + Constants.TIME.MINUTES_30;
    }
}

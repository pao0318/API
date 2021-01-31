import { randomBytes } from 'crypto';
import { Constants } from '../constants';

export function generateConfirmationCode() {
    return {
        code: randomBytes(20).toString('hex').substr(8, 6),
        expiresAt: new Date(Date.now() + Constants.TIME.MINUTES_30).toISOString(),
    };
}

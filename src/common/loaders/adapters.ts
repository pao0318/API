import { INestApplication } from '@nestjs/common';
import { Constants } from '../constants';

export const loadAdapters = (app: INestApplication): void => {
    const socketStateService = app.get(Constants.DEPENDENCY.SOCKET_STATE_SERVICE);
};

import { INestApplication } from '@nestjs/common';
import { SocketStateAdapter } from '../../services/socket-state/socket-state.adapter';
import { Constants } from '../constants';

export const loadAdapters = (app: INestApplication): void => {
    const socketStateService = app.get(Constants.DEPENDENCY.SOCKET_STATE_SERVICE);
    const redisPropagatorService = app.get(Constants.DEPENDENCY.REDIS_PROPAGATOR_SERVICE);

    app.useWebSocketAdapter(new SocketStateAdapter(app, socketStateService));
};

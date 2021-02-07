import { WebSocketAdapter } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';

export class SocketStateAdapter extends IoAdapter implements WebSocketAdapter {}

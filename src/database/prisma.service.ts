import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Config } from '../common/config';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super({ datasources: { db: { url: Config.DATABASE.URL } } });
    }
}

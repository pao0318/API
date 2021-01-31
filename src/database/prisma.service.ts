import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Config } from '../common/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        super({ datasources: { db: { url: Config.DATABASE.URL } } });
    }

    public async onModuleInit() {
        await this.$connect();
    }

    public async onModuleDestroy() {
        await this.$disconnect();
    }
}

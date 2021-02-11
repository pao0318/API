import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Config } from '../common/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        super({ datasources: { db: { url: Config.DATABASE.URL } } });
    }

    public async onModuleInit(): Promise<void> {
        await this.$connect();
    }

    public async onModuleDestroy(): Promise<void> {
        await this.$disconnect();
    }

    public async updateUserGeolocation(latitude: number, longitude: number): Promise<void> {
        await this.$executeRaw('UPDATE "User" SET latitude = $1, longitude = $2, geolocation=St_SetSRID(ST_MakePoint($2,$1), 4326)', [latitude, longitude]);
    }
}

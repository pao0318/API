import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Config } from '../common/config';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super({ datasources: { db: { url: Config.DATABASE.URL } } });
    }

    public async updateUserGeolocation(latitude: number, longitude: number, userId: string): Promise<void> {
        await this
            .$executeRaw`UPDATE "User" SET latitude = ${latitude}::FLOAT, longitude = ${longitude}::FLOAT, geolocation=St_SetSRID(ST_MakePoint(${longitude}::FLOAT,${latitude}::FLOAT), 4326) WHERE id = ${userId}`;
    }
}

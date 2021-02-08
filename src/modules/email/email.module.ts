import { Module } from '@nestjs/common';
import { NodemailerEmailService } from './nodemailer.service';

@Module({
    providers: [NodemailerEmailService],
    exports: [NodemailerEmailService]
})
export class EmailModule {}

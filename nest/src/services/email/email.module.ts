import { Module } from "@nestjs/common";
import { NodemailerEmailService } from './services/nodemailer.service';

@Module({
    providers: [NodemailerEmailService],
    exports: [NodemailerEmailService]
})

export class EmailModule {}
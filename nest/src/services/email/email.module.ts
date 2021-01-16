import { Module } from "@nestjs/common";
import { Constants } from '../../common/constants';
import { NodemailerEmailService } from './services/nodemailer.service';

@Module({
    exports: [{
        provide: Constants.DEPENDENCY.EMAIL_SERVICE,
        useClass: NodemailerEmailService
    }]
})

export class EmailModule {}
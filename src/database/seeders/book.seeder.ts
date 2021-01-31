import { Command } from 'nestjs-command';
import { Inject, Injectable } from '@nestjs/common';
import { random } from 'faker';
import { Constants } from '../../common/constants';
import { PrismaService } from '../prisma.service';
import { Genre } from '@prisma/client';
import { IBookCreateInput } from '../interfaces/IBookCreateInput';

@Injectable()
export class BookSeeder {
    constructor(@Inject(Constants.DEPENDENCY.DATABASE_SERVICE) private readonly _databaseService: PrismaService) {}

    @Command({
        command: 'seed:book',
        describe: 'Create new book',
        autoExit: true,
    })
    public async run(): Promise<void> {
        const data = this._generateFakeData();

        await this._saveBookToDatabase(data);

        console.log('Book generated successfully');
    }

    private _generateFakeData(): IBookCreateInput {
        return {
            ownedById: random.uuid(),
            title: random.word(),
            description: random.word(),
            genre: random.arrayElement(Object.values(Genre)),
            isbn: random.uuid(),
            image: random.word(),
        };
    }

    private async _saveBookToDatabase(data: IBookCreateInput): Promise<void> {
        try {
            await this._databaseService.book.create({ data });
        } catch (error) {
            console.log(error.message);
        }
    }
}

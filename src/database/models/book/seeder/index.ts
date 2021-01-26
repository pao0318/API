import { Command } from 'nestjs-command';
import { Inject, Injectable } from '@nestjs/common';
import { random } from 'faker';
import { Constants } from '../../../../common/constants';
import { IBookRepository } from '../interfaces/IBookRepository';
import { Book } from '../book';

@Injectable()
export class BookSeeder {
    constructor(
        @Inject(Constants.DEPENDENCY.BOOK_REPOSITORY)
        private readonly _bookRepository: IBookRepository,
    ) {}

    @Command({ command: 'seed:book', describe: 'Create new book', autoExit: true })
    public async run(): Promise<void> {
        const data = this._generateFakeData();

        await this._saveBookToDatabase(data);

        console.log('Book generated successfully');
    }

    private _generateFakeData(): Partial<Book> {
        return {
            ownedBy: random.uuid(),
            title: random.word(),
            description: random.word(),
            genre: random.arrayElement(Object.values(Constants.BOOK.GENRE)),
        };
    }

    private async _saveBookToDatabase(data: Partial<Book>): Promise<void> {
        try {
            await this._bookRepository.create(data);
        } catch (error) {
            console.log(error.message);
        }
    }
}

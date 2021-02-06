import { Genre } from '@prisma/client';

export interface IBookCreateInput {
    isbn: string;
    title: string;
    description: string;
    genre: Genre;
    image: string;
    ownedById: string;
}

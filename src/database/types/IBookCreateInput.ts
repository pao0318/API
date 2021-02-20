import { Genre, Language } from '@prisma/client';

export interface IBookCreateInput {
    isbn: string;
    title: string;
    description: string;
    genre: Genre;
    image: string;
    ownerId: string;
    latitude: number;
    longitude: number;
    language: Language;
}

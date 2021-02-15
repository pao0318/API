import { Genre } from '@prisma/client';

export class UpdatePreferenceBodyDto implements Readonly<UpdatePreferenceBodyDto> {
    public book: string;
    public author: string;
    public genres: Genre[];
}

import { IQuote } from '../types/IQuote';

export class GetQuoteResponseDto implements Readonly<GetQuoteResponseDto> {
    public text: string;
    public author: string | null;
}

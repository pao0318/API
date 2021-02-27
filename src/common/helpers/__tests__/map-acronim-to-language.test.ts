import { Language } from '@prisma/client';
import { mapAcronimToLanguage } from '../map-acronim-to-language';

describe('Map acronim to language', () => {
    describe("When acronim is 'en'", () => {
        it(`Should return ${Language.ENGLISH}`, () => {
            const result = mapAcronimToLanguage('en');
            expect(result).toEqual(Language.ENGLISH);
        });
    });

    describe("When acronim is 'de'", () => {
        it(`Should return ${Language.GERMAN}`, () => {
            const result = mapAcronimToLanguage('de');
            expect(result).toEqual(Language.GERMAN);
        });
    });

    describe("When acronim is 'fr'", () => {
        it(`Should return ${Language.FRENCH}`, () => {
            const result = mapAcronimToLanguage('fr');
            expect(result).toEqual(Language.FRENCH);
        });
    });

    describe("When acronim is 'sp'", () => {
        it(`Should return ${Language.SPANISH}`, () => {
            const result = mapAcronimToLanguage('sp');
            expect(result).toEqual(Language.SPANISH);
        });
    });
});

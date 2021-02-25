import { Language } from '@prisma/client';

export const mapAcronimToLanguage = (acronim: string): Language => {
    const languages = {
        en: Language.ENGLISH,
        de: Language.GERMAN,
        fr: Language.FRENCH,
        sp: Language.SPANISH
    };

    return languages[acronim.toString()];
};

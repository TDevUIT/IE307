import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export type Language = 'VI' | 'EN' | 'JP';

export const useLanguage = () => {
    const pathname = usePathname();

    const getLanguageFromPath = (path: string): Language => {
        const langSegment = path.split('/')[1].toUpperCase();
        return ['VI', 'EN', 'JP'].includes(langSegment) ? (langSegment as Language) : 'VI';
    };

    const [language, setLanguage] = useState<Language>(getLanguageFromPath(pathname));

    useEffect(() => {
        setLanguage(getLanguageFromPath(pathname));
    }, [pathname]);

    const handleLanguageChange = (lang: Language) => setLanguage(lang);

    return { language, handleLanguageChange };
};

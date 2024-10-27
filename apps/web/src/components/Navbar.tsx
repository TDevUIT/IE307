// Navbar.tsx
'use client';
import Link from 'next/link';
import React from 'react';
import { FaDownload } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useHandleTranslations } from '@/lib/handleTranslations';
import { Language, useLanguage } from '@/lib/useLanguage';
const Navbar: React.FC = () => {
    const t = useHandleTranslations("Navbar");
    const { language, handleLanguageChange } = useLanguage();

    return (
        <nav className="fixed w-full bg-white/60 backdrop-blur-md border-b border-gray-100 shadow-sm z-30">
            <div className="flex items-center justify-between mx-auto max-w-screen-xl p-3">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-4xl font-extrabold text-orange-600 dark:text-orange-400 whitespace-nowrap"
                    >
                        Kapi
                    </motion.span>
                </Link>

                <motion.div
                    className="flex items-center space-x-6 rtl:space-x-reverse"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex items-center space-x-2 text-sm">
                        {(['VI', 'EN', 'JP'] as Language[]).map((lang) => (
                            <Link
                                key={lang}
                                href={`/${lang.toLowerCase()}/`}
                                passHref
                            >
                                <button
                                    onClick={() => handleLanguageChange(lang)}
                                    className={`px-2 py-1 rounded-full transition-all ${
                                        language === lang 
                                            ? 'bg-orange-500 text-white' 
                                            : 'text-orange-600 hover:text-orange-500'
                                    }`}
                                >
                                    {lang}
                                </button>
                            </Link>
                        ))}
                    </div>

                    <Link 
                        href="/download" 
                        className="flex items-center space-x-1 px-4 py-2 text-sm text-orange-600 border border-orange-500 rounded-full transition-all hover:text-orange-500 hover:shadow-md hover:underline dark:text-orange-400"
                    >
                        <FaDownload />
                        <span>{t.download}</span>
                    </Link>
                </motion.div>
            </div>
        </nav>
    );
};

export default Navbar;

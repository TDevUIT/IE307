// Navbar.tsx
'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useHandleTranslations } from '@/lib/handleTranslations';
import { Language, useLanguage } from '@/lib/useLanguage';
import { GiHamburgerMenu } from "react-icons/gi";
const Navbar: React.FC = () => {
    const t = useHandleTranslations("Navbar");
    const { language, handleLanguageChange } = useLanguage();
    const [open, setOpen] = useState(false);
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
                    <div className="md:flex items-center space-x-2 text-sm hidden">
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
                    
                    <div className='flex justify-center items-center gap-x-2'>
                        <Link 
                            href="/download" 
                            className="flex items-center space-x-1 px-4 py-2 text-sm text-orange-600 border border-orange-500 rounded-full transition-all hover:text-orange-500 hover:shadow-md hover:underline dark:text-orange-400"
                        >
                            <FaDownload />
                            <span>{t.download}</span>
                        </Link>
                        <GiHamburgerMenu className='w-6 h-6 object-contain cursor-pointer text-orange-500 md:hidden flex'
                            onClick={() => {
                                setOpen((prev) => !prev);
                            }}
                        />
                    </div>
                    {open && 
                        <div className='w-auto h-12 flex justify-center items-center bg-transparent absolute top-12 right-0'>
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
                    }
                </motion.div>
            </div>
        </nav>
    );
};

export default Navbar;

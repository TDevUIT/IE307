'use client'
import Link from 'next/link';
import React from 'react';
import { FaDownload } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useHandleTranslations } from '@/lib/handleTranslations';

const Navbar = () => {
    const t = useHandleTranslations("Navbar");
    return (
        <nav className="z-30 fixed w-full bg-white/60 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mx-auto max-w-screen-xl p-3">
            
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="self-center text-4xl font-extrabold whitespace-nowrap text-orange-600 dark:text-orange-400"
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
            <Link 
                href="/download" 
                className="text-sm text-orange-600 hover:text-orange-500 dark:text-orange-400 hover:underline rounded-full border border-orange-500 px-4 py-2 flex items-center space-x-1 transition-all hover:shadow-md"
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

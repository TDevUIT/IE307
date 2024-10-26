'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'
import { useHandleTranslations } from '@/lib/handleTranslations'

const Footer = () => {
    const t = useHandleTranslations("Footer")
    return (
        <footer className="relative py-6 px-4 text-center">
        <div
            className="absolute inset-0 bg-orange-500 opacity-30 blur-lg -z-10 bottom-0"
            style={{
                borderTopLeftRadius: '100%',
                borderTopRightRadius: '100%',
                height: '100%', 
            }}
            />
        <motion.div
            className="container mx-auto flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-2xl font-bold text-orange-600">{t.appName}</h1>
            <p className="text-gray-600 mt-2 text-sm max-w-xs">
                {t.description}
            </p>

            <div className="flex gap-6 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={24} className="text-orange-600 hover:text-orange-400 transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter size={24} className="text-orange-600 hover:text-orange-400 transition" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} className="text-orange-600 hover:text-orange-400 transition" />
            </a>
            </div>

            <motion.div
            className="mt-6 text-xs text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            >
                {t.copyright}
            </motion.div>
        </motion.div>
        </footer>
    )
}

export default Footer

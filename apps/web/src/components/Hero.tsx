'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FaGooglePlay, FaApple } from 'react-icons/fa';
import PhoneScreen from './Phone';
import { useHandleTranslations } from '@/lib/handleTranslations';

const heroVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.2 },
  },
};

const textVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

const phoneVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 60, damping: 10 } },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: '0px 10px 15px rgba(255, 123, 0, 0.3)',
    transition: { duration: 0.3 },
  },
};

const HeroPage = () => {
  const t = useHandleTranslations("Hero");

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={heroVariants}
      className="relative min-h-screen w-full flex flex-col justify-center items-center bg-white py-10 px-6 md:px-40 overflow-hidden"
    >
      <div className="absolute inset-0 flex justify-center items-center -z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="w-[60vw] h-[60vw] md:w-3/4 md:h-3/4 rounded-full bg-orange-200 opacity-60 blur-3xl"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className="w-[40vw] h-[40vw] md:w-1/2 md:h-1/2 rounded-full bg-orange-500 opacity-40 blur-2xl -translate-y-10 md:-translate-y-16 translate-x-5 md:translate-x-10"
        ></motion.div>
      </div>

      <motion.div
        className="flex flex-col-reverse md:flex-row justify-between items-center w-full relative space-y-6 md:space-y-0"
        variants={heroVariants}
      >
        <motion.div
          className="text-center md:text-left text-black space-y-6 max-w-xl md:pr-12"
          variants={textVariants}
        >
          <motion.h1
            className="text-3xl md:text-5xl font-extrabold text-orange-500 leading-tight"
            variants={textVariants}
          >
            {t.title}
          </motion.h1>
          <motion.p
            className="text-gray-700 text-base md:text-xl leading-relaxed"
            variants={textVariants}
          >
            {t.description}
          </motion.p>

          <div className="flex space-x-4 md:justify-start justify-center">
            <motion.a
              href="#"
              variants={buttonVariants}
              whileHover="hover"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition ease-in-out duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <FaGooglePlay className="text-lg" />
              <span>Google Play</span>
            </motion.a>

            <motion.a
              href="#"
              variants={buttonVariants}
              whileHover="hover"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition ease-in-out duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <FaApple className="text-lg" />
              <span>App Store</span>
            </motion.a>
          </div>
        </motion.div>
        
        <motion.div
          className="flex justify-center mb-8 md:mb-0 w-2/3 sm:w-1/2 md:w-auto md:ml-0 ml-12"
          variants={phoneVariants}
        >
          <PhoneScreen />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HeroPage;

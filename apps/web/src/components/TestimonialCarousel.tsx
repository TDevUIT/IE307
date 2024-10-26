'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { FaUserCircle } from 'react-icons/fa'
import { useHandleTranslations } from '@/lib/handleTranslations'

const testimonials = [
    {
        name: "Phuong Thao",
        message: "Kapi has transformed my Japanese learning journey! Highly recommended!",
        role: "Japanese Learner"
    },
    {
        name: "Thai Ta",
        message: "The best app for learning Japanese vocabulary on the go!",
        role: "Language Enthusiast"
    },
    {
        name: "Thanh Tai",
        message: "Amazing design and seamless functionality. A joy to use every day!",
        role: "App Developer"
    }
];

const UserTestimonial: React.FC = () => {
    const t = useHandleTranslations("Testimonials");

    return (
        <section className="py-20 bg-white sm:py-24 lg:py-28">
            <div className="max-w-6xl px-6 mx-auto text-center">
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
                        {t.header}
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        {t.subheader}
                    </p>
                </motion.div>

                <div className="relative grid grid-cols-1 gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            className="relative p-8 overflow-hidden rounded-lg shadow-lg"
                            whileHover={{ scale: 1.05, rotate: 1 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <div className="absolute inset-0 bg-orange-200 opacity-25 rounded-lg blur-2xl -z-10"></div>

                            <div className="flex justify-center mb-6">
                                <FaUserCircle className="w-16 h-16 text-orange-600 opacity-80" />
                            </div>
                            <blockquote className="text-lg text-gray-800 italic tracking-wide leading-relaxed">
                                “{testimonial.message}”
                            </blockquote>
                            <div className="mt-6 text-center">
                                <p className="text-lg font-semibold text-orange-900">{testimonial.name}</p>
                                <p className="text-sm text-gray-600">{testimonial.role}</p>
                            </div>
                            <div className="flex justify-center mt-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="w-5 h-5 text-orange-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                        />
                                    </svg>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
                >
                    <a
                        href="#"
                        className="inline-block px-6 py-3 mt-4 text-base font-bold text-orange-700 border-b-2 border-transparent hover:border-orange-700 transition-colors duration-300"
                    >
                        {t.seeAllReviews}
                    </a>
                </motion.div>
            </div>
        </section>
    )
}

export default UserTestimonial;

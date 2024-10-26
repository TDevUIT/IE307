'use client'
import { motion } from 'framer-motion';
import { FaBookOpen, FaChartLine, FaBell } from 'react-icons/fa';
import { FiBatteryCharging, FiWifi } from 'react-icons/fi';
import { ReactNode } from 'react';

interface Feature {
    icon: ReactNode;
    title: string;
    description: string;
}

interface FloatingPhoneProps {
    feature: Feature;
}

const FloatingPhone: React.FC<FloatingPhoneProps> = ({ feature }) => {
    return (
        <motion.div
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 2,
                ease: "easeInOut",
            }}
            className="relative h-[420px] w-[240px] rounded-[24px] border-2 border-b-4 border-r-4 border-white border-l-neutral-200 border-t-neutral-200 bg-neutral-900 p-1 pl-[3px] pt-[3px]"
        >
            <HeaderBar />
            <Screen feature={feature} />
        </motion.div>
    );
};

const HeaderBar: React.FC = () => (
    <>
        <div className="absolute left-[50%] top-2.5 z-10 h-2 w-16 -translate-x-[50%] rounded-md bg-neutral-900"></div>
        <div className="absolute right-3 top-2 z-10 flex gap-2">
            <FiWifi className="text-neutral-600" />
            <FiBatteryCharging className="text-neutral-600" />
        </div>
    </>
);

interface ScreenProps {
    feature: Feature;
}

const Screen: React.FC<ScreenProps> = ({ feature }) => (
    <div className="w-full h-full relative">
        <div className="relative z-0 grid h-full w-full place-content-center overflow-hidden rounded-[20px] bg-white">
            <div className="mt-4 flex flex-col items-center px-3">
                <h2 className="text-2xl font-extrabold text-black">Kapi!</h2>
                <div className="mt-2 text-center">
                    <div className='flex items-center justify-center'>
                        {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold mt-2">{feature.title}</h3>
                    <p className="text-sm mt-1 text-gray-600">{feature.description}</p>
                </div>
            </div>
            <button className="absolute bottom-4 left-4 right-4 z-10 rounded-lg border-[1px] bg-white py-2 text-sm font-medium text-black backdrop-blur">
                Get Started
            </button>
        </div>
    </div>
);

const features: Feature[] = [
    {
        icon: <FaBookOpen size={30} color="rgb(241,139,47)" />,
        title: "Vocabulary Flashcards",
        description: "Build your vocabulary with engaging flashcards tailored to your level.",
    },
    {
        icon: <FaChartLine size={30} color="rgb(241,139,47)" />,
        title: "Progress Tracking",
        description: "Monitor your learning journey with personalized progress insights.",
    },
    {
        icon: <FaBell size={30} color="rgb(241,139,47)" />,
        title: "Notifications",
        description: "Stay on track with reminders for vocabulary reviews and grammar practice.",
    },
];

const HorizontalPhones: React.FC = () => (
    <section className="flex flex-col items-center bg-white p-8">
        <h2 className="text-3xl font-bold text-center mb-8">App Features</h2>
        <div className="flex flex-wrap gap-8 justify-center lg:gap-12">
            {features.map((feature, index) => (
                <FloatingPhone key={index} feature={feature} />
            ))}
        </div>
    </section>
);

export default HorizontalPhones;

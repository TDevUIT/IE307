'use client'
import { motion } from "framer-motion";
import { FiBatteryCharging, FiWifi } from "react-icons/fi";
import logo from '../../public/images/Capy.png'
import Image from "next/image";
import vietnamFlag from '../../public/images/vietnam_flag.png'
import japaneseFlag from '../../public/images/japanese_flag.png'

const PhoneScreen = () => {
  return (
    <section className="grid place-content-center p-12">
      <FloatingPhone />
    </section>
  );
};

const FloatingPhone = () => {
  return (
    <div
      style={{
        transformStyle: "preserve-3d",
        transform: "rotateY(-30deg) rotateX(15deg)",
      }}
      className="rounded-[24px] bg-orange-500"
    >
      <motion.div
        initial={{
          transform: "translateZ(8px) translateY(-2px)",
        }}
        animate={{
          transform: "translateZ(32px) translateY(-8px)",
        }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 2,
          ease: "easeInOut",
        }}
        className="relative h-96 w-56 rounded-[24px] border-2 border-b-4 border-r-4 border-white border-l-neutral-200 border-t-neutral-200 bg-neutral-900 p-1 pl-[3px] pt-[3px]"
      >
        <HeaderBar />
        <Screen />
      </motion.div>
    </div>
  );
};

const HeaderBar = () => {
  return (
    <>
      <div className="absolute left-[50%] top-2.5 z-10 h-2 w-16 -translate-x-[50%] rounded-md bg-neutral-900"></div>
      <div className="absolute right-3 top-2 z-10 flex gap-2">
        <FiWifi className="text-neutral-600" />
        <FiBatteryCharging className="text-neutral-600" />
      </div>
    </>
  );
};

const Screen = () => {
  return (
    <div className="w-full h-full relative">
      <div className="relative z-0 grid h-full w-full place-content-center overflow-hidden rounded-[20px] bg-white">
        <div className="mt-4 flex flex-row items-start justify-between px-3">
          <h2 className="text-xl font-extrabold text-black">Kapi!</h2>
          <div className="flex flex-row gap-x-1 mt-1">
            <Image src={vietnamFlag} width={18}  height={18} alt='vn' />
            <Image src={japaneseFlag} width={18}  height={18} alt='jp'/>
          </div>
        </div>
        <Image width={340} height={340} src={logo} alt="logo"
          className="mb-10 h-[340px] w-[340px] rounded-full object-cover sm:h-64 sm:w-64"
        />
        <button className="absolute bottom-4 left-4 right-4 z-10 rounded-lg border-[1px] bg-white py-2 text-sm font-medium text-black backdrop-blur">
          Get Started
        </button>
        <div className="absolute -bottom-72 left-[50%] h-96 w-96 -translate-x-[50%] rounded-full bg-orange-500" />
      </div>
      <div className="bg-white bg-opacity-20 w-[160px] h-[80px] rounded-lg absolute top-10 translate-x-[70%] z-30 shadow-lg text-center flex items-center justify-center backdrop-blur-md border border-white/30">
        レビュー
      </div>
      <div className="bg-white bg-opacity-20 w-[160px] h-[80px] rounded-lg absolute bottom-28 -translate-x-[70%] z-30 shadow-lg text-center flex items-center justify-center backdrop-blur-md border border-white/30">
        レビュー
      </div>
      <div className="bg-white bg-opacity-20 w-[160px] h-[80px] rounded-lg absolute bottom-10 translate-x-[70%] z-30 shadow-lg text-center flex items-center justify-center backdrop-blur-md border border-white/30">
        レビュー
      </div>
    </div>
    
  );
};

export default PhoneScreen;

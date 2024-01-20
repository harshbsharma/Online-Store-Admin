"use client"

import Image from "next/image";
import { easeIn, easeOut, motion } from "framer-motion"

import React from 'react'
import Lottie from 'lottie-react';
import Animation from "@/assests/animation.json"
import Link from "next/link";
import { CircleUserRound, Contact, Github } from "lucide-react";

const Hero = () => {
    // const spring = {
    //     type: "spring",
    //     damping: 10,
    //     stiffness: 100
    //   }
  return (
    <div>

<div className="bg-white dark:bg-[#020817] flex sm:flex-col ">
    <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto  lg:pl-9 lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-10">
        <motion.div 
          initial={{ y: -1000 }}
          animate={{ y: 0 }}
            transition={{ duration: 1.3 ,ease:'backOut'}}             
        className="mr-auto place-self-center lg:col-span-7">
            <h1
                className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">
                Manage Your <br/>Products &amp; Brands.
            </h1>

            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Cozy Cart is a versatile CMS and Inventory Management System designed to streamline business operations, 
            from managing inventory to facilitating secure online transactions. It provides an 
            intuitive platform for businesses to efficiently organize, track, and sell their products or services
                {/* <a target="_blank" className="hover:underline">Tailwind CSS</a> and based on the
                components from the <a href="#/" className="hover:underline" target="_blank">Flowbite Library</a> and the
                <a href="https://flowbite.com/blocks/" target="_blank" className="hover:underline">Blocks System</a>. */}

            </p>

            <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">

                <Link href="https://github.com/harshbsharma/Online-Store-Admin" target="_blank"
                    className="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                    <Github/>
                    &nbsp; View on GitHub
                </Link>

                <Link href="/contact" target="_blank"
                    className="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                    <CircleUserRound/>
                    &nbsp; Contact Us
                </Link>

                {/* <Link href="/contact" target="_blank"
                    className="inline-flex items-center justify-center w-full px-5 py-3 mb-2 mr-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:w-auto focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                    <CircleUserRound size={20} className="mr-2 "/>

                    Contact Us
                </Link> */}

            </div>
        </motion.div>

        <div className="lg:mt-0 lg:col-span-5 mt-2 flex items-center justify-center overflow-hidden">
            {/* <Image src="https://demo.themesberg.com/landwind/images/hero.png" width={500} height={200} alt="hero image"/> */}
            <Lottie
                className="w-full h-full object-cover max-sm:h-[200px] max-sm:w-[200px] max-md:h-[300px] max-md:w-[300px]"
                animationData={Animation}/>
        </div>

    </div>
</div>
    </div>
  )
}

export default Hero
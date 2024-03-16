import React from 'react'
import { motion } from 'framer-motion'
const WhyUs = () => {
    const parentVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 1.4,
            staggerChildren: 0.2, // Adjust the stagger duration as needed
          },
        },
      };
    
      const childVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      };
    
  return (

    <div className="bg-black">

        <motion.div id="features"
        variants={parentVariants}
        initial="hidden"
        animate="visible"
        className="relative block px-6 py-10 md:py-20 md:px-10  border-t border-b border-neutral-900 bg-neutral-900/30">


            <div className="relative mx-auto max-w-5xl text-center">
                <span className="text-gray-400 my-3 flex items-center justify-center font-medium uppercase tracking-wider">
                Why choose us
                </span>
                <h2
                    className="block w-full bg-gradient-to-b from-white to-gray-400 bg-clip-text font-bold text-transparent text-3xl sm:text-4xl">
                    Easiest Inventory Management
                </h2>
                <p
                    className="mx-auto my-4 w-full max-w-xl bg-transparent text-center font-medium leading-relaxed tracking-wide text-gray-400">
                    Our platfrom allow for maximum customization. No technical skills required – our intuitive design tools
                    let
                    you get the job done easily.
                </p>
            </div>


            <div className="relative mx-auto max-w-7xl z-10 grid grid-cols-1 gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-3">
                <motion.div 
                variants={childVariants}
                className="rounded-md border border-neutral-800 bg-neutral-900/50 p-8 text-center shadow">
                    <div className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border 
                        bg-gradient-to-r from-purple-700 via-purple-600 to-purple-900 border-purple-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-color-swatch" width="24"
                            height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                            strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M19 3h-4a2 2 0 0 0 -2 2v12a4 4 0 0 0 8 0v-12a2 2 0 0 0 -2 -2"></path>
                            <path d="M13 7.35l-2 -2a2 2 0 0 0 -2.828 0l-2.828 2.828a2 2 0 0 0 0 2.828l9 9"></path>
                            <path d="M7.3 13h-2.3a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h12"></path>
                            <line x1="17" y1="17" x2="17" y2="17.01"></line>
                        </svg>
                    </div>
                    <h3 className="mt-6 text-gray-400">Customizable</h3>
                    <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">Tailor your store as per your
                        needs. You can customize everything, from the color scheme to sizes and categories.
                    </p>
                </motion.div>


                <motion.div 
                variants={childVariants}
                className="rounded-md border border-neutral-800 bg-neutral-900/50 p-8 text-center shadow">
                    <div className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border 
                        bg-gradient-to-r from-purple-700 via-purple-600 to-purple-900 border-purple-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bolt" width="24"
                            height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                            strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <polyline points="13 3 13 10 19 10 11 21 11 14 5 14 13 3"></polyline>
                        </svg>
                    </div>
                    <h3 className="mt-6 text-gray-400">Detail Analytics</h3>
                    <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">
                        Our platform provides you with detailed analytics of your store. You can track your sales, orders and
                        inventory.
                    </p>
                </motion.div>


                <motion.div 
                variants={childVariants}
                className="rounded-md border border-neutral-800 bg-neutral-900/50 p-8 text-center shadow">
                    <div className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border 
                    bg-gradient-to-r from-purple-700 via-purple-600 to-purple-900 border-purple-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-tools" width="24"
                            height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                            strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M3 21h4l13 -13a1.5 1.5 0 0 0 -4 -4l-13 13v4"></path>
                            <line x1="14.5" y1="5.5" x2="18.5" y2="9.5"></line>
                            <polyline points="12 8 7 3 3 7 8 12"></polyline>
                            <line x1="7" y1="8" x2="5.5" y2="9.5"></line>
                            <polyline points="16 12 21 17 17 21 12 16"></polyline>
                            <line x1="16" y1="17" x2="14.5" y2="18.5"></line>
                        </svg>
                    </div>
                    <h3 className="mt-6 text-gray-400">Fully Featured</h3>
                    <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">
                        Loaded with User Centric Features for a seamless experience. We have got you covered with everything.
                    </p>
                </motion.div>


            </div>

    

    </motion.div>
</div>

  )
}

export default WhyUs
"use client"
import React from 'react'
import ContactForm from './components/form'


const Contact = () => {
    
    return (
        <main className=" py-28 bg-gray-900">
            <div className='absolute blur-[118px] max-w-lg h-[800px] mx-auto sm:max-w-3xl sm:h-[400px]' style={{ background: "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)" }}></div>
            <div className="flex flex-col items-center justify-center max-w-screen-xl mx-auto text-gray-600 sm:px-4 md:px-8 lg:px-10">
                <div className="max-w-lg space-y-3 px-4 sm:mx-auto sm:text-center sm:px-0">
                    <h3 className="text-cyan-400 font-semibold">
                        Contact
                    </h3>
                    <p className="text-white text-3xl font-semibold sm:text-4xl">
                        Get in touch
                    </p>
                    <p className="text-gray-300">
                        We’d love to hear from you! Please fill out the form bellow.
                    </p>
                    <br/>
                </div>
                <ContactForm/>    
            </div>

            
        </main>
    )
}
export default Contact
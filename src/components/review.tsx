import React from 'react'
import Image from 'next/image'

const Review = () => {

  return (
    <>

<div className="text-gray-600 dark:text-gray-300 mt-8 mb-8" id="reviews">

<div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">

    <div className="mb-10 space-y-4 px-6 md:px-0">
        <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white md:text-4xl">
            We have some fans.
        </h2>
    </div>


    <div className="md:columns-2 lg:columns-3 gap-8 space-y-8">


        <div
            className="aspect-auto hover:scale-105 transition p-8  hover:ring-2 hover:ring-gray-700 border ring-gray-500 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
            <div className="flex gap-4">
                <Image className="w-12 h-12 rounded-full" src="https://randomuser.me/api/portraits/women/12.jpg" alt="user avatar" width="400" height="400" loading="lazy"/>
                <div>
                    <h6 className="text-lg font-medium text-gray-700 dark:text-white">Daniella Doe</h6>
                    <p className="text-sm text-gray-500 dark:text-gray-300">Bella Beauty</p>
                </div>
            </div>
            <p className="mt-8">CollabHub has revolutionized how we manage our online store. 
            The intuitive interface and robust inventory management make our daily operations a breeze.
             Our team loves the seamless transaction process, and our customers appreciate the user-friendly experience.
            </p>
        </div>


        <div
            className="aspect-auto hover:scale-105 transition p-8  hover:ring-2 hover:ring-gray-700 border ring-gray-500 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
            <div className="flex gap-4">
                <Image className="w-12 h-12 rounded-full" src="https://randomuser.me/api/portraits/men/14.jpg" alt="user avatar" width="200" height="200" loading="lazy"/>
                <div>
                    <h6 className="text-lg font-medium text-gray-700 dark:text-white">Marcus Carter</h6>
                    <p className="text-sm text-gray-500 dark:text-gray-300">Head Marketing, HomyBee</p>
                </div>
            </div>
            <p className="mt-8">Using CollabHub has been a game-changer for our business. The platform&apos;s efficient inventory management system has significantly reduced our workload. 
            Plus, the smooth and secure transaction process has undoubtedly enhanced our customer&apos;s shopping experience
            </p>
        </div>


        <div
            className="aspect-auto hover:scale-105 transition p-8 hover:ring-2 hover:ring-gray-700 border ring-gray-500 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
            <div className="flex gap-4">
                <Image className="w-12 h-12 rounded-full" src="https://randomuser.me/api/portraits/men/18.jpg" alt="user avatar" width="200" height="200" loading="lazy"/>
                <div>
                    <h6 className="text-lg font-medium text-gray-700 dark:text-white">Jordan Wallace</h6>
                    <p className="text-sm text-gray-500 dark:text-gray-300">Founder, BuyLocal</p>
                </div>
            </div>
            <p className="mt-8">CollabHub has added tremendous value to our online store.
             The user-friendly interface, coupled with powerful inventory management, has allowed us to focus more on growing our business. 
            The secure and seamless transaction process has instilled trust among our customers.
            </p>
        </div>


        <div
            className="aspect-auto hover:scale-105 transition p-8 hover:ring-2 hover:ring-gray-700 border ring-gray-500 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
            <div className="flex gap-4">
                <Image className="w-12 h-12 rounded-full" src="https://randomuser.me/api/portraits/women/2.jpg" alt="user avatar" width="200" height="200" loading="lazy"/>
                <div>
                    <h6 className="text-lg font-medium text-gray-700 dark:text-white">Sarah Thompson</h6>
                    <p className="text-sm text-gray-500 dark:text-gray-300">Developer</p>
                </div>
            </div>
            <p className="mt-8">The integration with our frontend systems has been seamless, and the platform&apos;s secure API ensures smooth transactions, making it an indispensable tool for our e-commerce operations and has simplified our day-to-day operations. CollabHub is a must-have for any online retailer.
            </p>
        </div>


        <div
            className="aspect-auto hover:scale-105 transition p-8 hover:ring-2 hover:ring-gray-700 border ring-gray-500 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
            <div className="flex gap-4">
                <Image className="w-12 h-12 rounded-full" src="https://randomuser.me/api/portraits/women/62.jpg" alt="user avatar" width="200" height="200" loading="lazy"/>
                <div>
                    <h6 className="text-lg font-medium text-gray-700 dark:text-white">Andy Doe</h6>
                    <p className="text-sm text-gray-500 dark:text-gray-300">Manager</p>
                </div>
            </div>
            <p className="mt-8"> CollabHub has exceeded our expectations. The ease of use and robust features have streamlined our online store management. Our transactions are now more secure, and the overall experience for both our team and customers has been exceptional.
            </p>
        </div>


        <div
            className="aspect-auto hover:scale-105 transition p-8 hover:ring-2 hover:ring-gray-700 border ring-gray-500 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
            <div className="flex gap-4">
                <Image className="w-12 h-12 rounded-full" src="https://randomuser.me/api/portraits/men/19.jpg" alt="user avatar" width="400" height="400" loading="lazy"/>
                <div>
                    <h6 className="text-lg font-medium text-gray-700 dark:text-white">Dylan Martinez</h6>
                        <p className="text-sm text-gray-500 dark:text-gray-300">Mobile dev</p>
                </div>
            </div>
            <p className="mt-8">CollabHub seamlessly integrates with our e-commerce store, providing unparalleled control over our inventory. The smooth flow of data between our storefront and CollabHub ensures accurate product listings and efficient order fulfillment. One must try them for business growth.
            </p>
        </div>

    </div>
</div>
</div>
    
    </>
  )
}

export default Review
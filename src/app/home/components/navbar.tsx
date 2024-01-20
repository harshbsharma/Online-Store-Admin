"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import { Nunito } from 'next/font/google'
import { Store } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const inter = Nunito({ subsets: ['cyrillic-ext'] })
const Navbar = () => {
    const router = useRouter();
    const signup = () => {
        router.push("/sign-up")
    }
    const login = () => {
        router.push("/sign-in") 
    }
  return (
    <div>
            <nav
            className="sm:hidden md:hidden mt-4 inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 dark:border-black bg-white/80 dark:bg-stone-400   py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
            <div className="px-4">
                <div className="flex items-center justify-between">
                    <div className="flex shrink-0">
                        <Link aria-current="page" className="flex items-center" href="/">
                            {/* <Image className="h-7 w-auto" width={100} height={100} src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="image"/> */}
                            <Store size={40} color='black'/>
                            <p className="sr-only">Website Title</p>
                        </Link>
                    </div>
                    {/* <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
                        <Link aria-current="page"
                            className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                            href="#">How it works</Link>
                        <Link className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                            href="#">Pricing</Link>
                    </div> */}
                    <div className={`${inter.className.toString()} ml-10`}>
                        <p className='dark:text-black text-3xl font-bold'>Welcome To CozyCart💫</p>
                    </div>
                    <div className="flex items-center justify-end gap-3">
                        <ThemeToggle/>
                        {/* <Link className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
                            href="/sign-up">Sign Up</Link>
                        <Link className="inline-flex items-center justify-center rounded-xl bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            href="/sign-in">Login</Link> */}
                        <Button className='bg-black text-white hover:bg-white hover:text-black transition-all' onClick={signup}>Sign Up</Button>
                        <Button className='bg-black text-white hover:bg-white hover:text-black transition-all' onClick={login}>Log In</Button>
                    </div>
                </div>
            </div>
        </nav>

{/* <nav className="xl:hidden lg:hidden 2xl:hidden border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
    </a>
    <button data-collapse-toggle="navbar-hamburger" type="button" className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-hamburger" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
      </svg>
    </button>
    <div className="hidden w-full" id="navbar-hamburger">
      <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <li>
          <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded dark:bg-blue-600" aria-current="page">Home</a>
        </li>
        <li>
          <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Services</a>
        </li>
        <li>
          <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white">Pricing</a>
        </li>
        <li>
          <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</nav> */}
</div>
  )
}

export default Navbar
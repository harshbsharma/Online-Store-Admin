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
    <header
    className="mt-4 inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 dark:border-black bg-white/80 dark:bg-stone-400   py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
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
</header>
  )
}

export default Navbar
"use client"
import AnotherHero from '@/components/another-hero'
import Footer from '@/components/footer'
import Hero from '@/components/hero-section'
import Review from '@/components/review'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import WhyUs from '@/components/why-us'
import {   useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React from 'react'
import Image from 'next/image'
import Logo from "@/app/home/logo.png"
import Navbar from './components/navbar'
import { Arvo } from 'next/font/google'
import Link from 'next/link'


const inter= Arvo({subsets:['latin'],weight:"400"})  
const HomePage = () => {
    const {isSignedIn} = useAuth();
    const router = useRouter();
    if(isSignedIn){
        router.push("/")
    }
    const handleclick = () => {
        router.push("/sign-in")
    } 
    const SignupClick = () => {
        router.push("/sign-up")
    } 
  return (
    <div className='pb-10'>
      
        <div className='bg-[#111827] w-auto overflow-hidden flex items-center justify-between p-5 '>
            <div className='ml-5 max-sm:ml-1'>
                <Link href="/home">
                
                <p className={`${inter.className} text-white text-3xl sm:text-2xl`}>CozyCart</p>
                </Link>
            </div>

            <div className='flex gap-2'>
                <ThemeToggle/>
                <Button onClick={SignupClick} className='max-sm:hidden max-md:hidden bg-white text-black hover:bg-white hover:text-black hover:scale-105'>Sign Up</Button>
                <Button onClick={handleclick} className='bg-white text-black hover:bg-white hover:text-black hover:scale-105'>Log In</Button>
            </div>
        </div>

        <div className=''>
            <Hero/>
            <WhyUs/>
            <Review/>

            <Separator/>
            <AnotherHero/>
            <Separator/>

            <Footer/>
        </div>
    </div>
  )
}

export default HomePage
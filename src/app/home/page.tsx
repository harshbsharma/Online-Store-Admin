"use client"
import AnotherHero from '@/components/another-hero'
import Footer from '@/components/footer'
import Hero from '@/components/hero-section'
import Review from '@/components/review'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import WhyUs from '@/components/why-us'
import {  useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React from 'react'
import Image from 'next/image'
import Logo from "@/app/home/logo.png"
import Navbar from './components/navbar'

const HomePage = () => {
    const {isSignedIn} = useAuth();
    const router = useRouter();
    if(isSignedIn){
        router.push("/")
    }
    const handleclick = () => {
        router.push("/sign-in")
    } 
  return (
    <div className='pb-10'>
        {/* <div className='mt-5 lg:hidden md:hidden border rounded-2xl mr-2 ml-2 pl-5  h-[50px] border-white flex gap-40 justify-evenly items-center overflow-hidden'>
                <Image src={Logo} width={50} height={50} className='rounded-full' alt="logo"/>
            <div className='flex item-center justify-center gap-2'>
            <ThemeToggle/>
            <Button onClick={handleclick}>
                Sign In
            </Button>
            </div>
        </div> */}
        <Navbar/>

        <div>
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
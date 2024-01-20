import { UserButton, auth } from '@clerk/nextjs'
import React from 'react'
import MainNav from './mainNav'
import StoreSwitcher from './store-switcher'
import { redirect } from 'next/navigation'
import prismadb from '@/lib/prismadb'
import { ThemeToggle } from './theme-toggle'
import MobileNav from './mobileNav'

const Navbar = async() => {

   const {userId} = auth(); 
    if(!userId){
         redirect("/sign-in")
    }

    const stores = await prismadb.store.findMany({
        where:{
            userId:userId,
        }
    })  
  return (
    <div className='border-b'>
        <div className='flex h-16 items-center px-4'>
            <MobileNav className='md:hidden'/>
            <StoreSwitcher items={stores}/>

            <MainNav className='mx-6'/>

            <div className='ml-auto flex items-center space-x-4 max-sm:space-x-1'>
                <ThemeToggle/>
                <UserButton afterSignOutUrl='/home'/>
                
            </div>
        </div>
    </div>
  )
}

export default Navbar
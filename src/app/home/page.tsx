"use client"
import { Button } from '@/components/ui/button'
import {  useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React from 'react'

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
    <div>
        <Button onClick={handleclick}>
            Sign In
        </Button>
    </div>
  )
}

export default HomePage
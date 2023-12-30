"use client"
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { useStoreModal } from '../../../hooks/use-store-modal'
import { useEffect } from 'react'

export default function Home() {

  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(()=>{

    if(!isOpen)
    {
      onOpen();
    }

  },[isOpen, onOpen])
  
  return (
    <div>
      Root Page

    </div>
  )
}

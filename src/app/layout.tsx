import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '../../providers/theme-provider'
import { ClerkProvider } from '@clerk/nextjs'
import { ModalProvider } from '../../providers/modal-provider'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from '@vercel/analytics/react';
const inter = Inter({ subsets: ['latin'] })


const url = "https://cozycart.vercel.app"
const title=  'Cozy Cart Store Admin'
const description = 'A Fully Featured Admin Dashboard with CMS and Inventroy Management for your Ecommerce Store  '

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  keywords:[
    "Cozy Cart",
    "Cozy Cart Admin",
    "Ecommerce Admin",
    "Ecommerce CMS",
    "Ecommerce Dashboard",
    "Ecommerce Inventory Management",
    "Ecommerce Admin Dashboard",
  ],
  creator: "Harsh Sharma",
  // themeColor:[
  //   { media: '(prefers-color-scheme: light)', color: 'white' },
  //   { media: '(prefers-color-scheme: dark)', color: 'black' },
  // ],
  openGraph:{
    type: 'website',
    url,
    title,
    description,
    siteName: title,
    images: [
      {
        url: '/images/logo.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@0xharsh_sharma',
    images: '/images/logo.png',
   },
  icons: {  
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
       <html lang="en">
        <body className={inter.className}>
              <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
                  <ToastContainer/>
                  <ModalProvider/>
                  <Toaster/>
                    {children}
                    <Analytics />
              </ThemeProvider>
        </body>
     </html>
    </ClerkProvider>
   
  )
}

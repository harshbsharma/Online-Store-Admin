import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '../../providers/theme-provider'
import { ClerkProvider } from '@clerk/nextjs'
import { ModalProvider } from '../../providers/modal-provider'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ['latin'] })


const url = "https://cozycart.vercel.app"
const title=  'Cozy Cart Store Admin'
const description = 'A Fully Featured Admin Dashboard with CMS and Inventroy Management'

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
    title,
    description,
    creator: '@0xharsh_sharma',
    images: '/src/assets/logo.png',
   },
  icons: {  
    icon: '/logo.ico',
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
                  {children}
            </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
   
  )
}

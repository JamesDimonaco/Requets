import Sidebar from '@/components/Sidebar'
import './globals.css'
import { Inter } from 'next/font/google'
import AuthProvider from './AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Plex Requests',
  description: 'Request movies and TV shows to be added to Plex',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full bg-white">
      <AuthProvider>
        <body className='h-full'>
          <Sidebar>
            {children}
          </Sidebar>
        </body>
      </AuthProvider>
    </html>
  )
}

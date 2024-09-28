import './globals.css'
import { Metadata } from 'next'
import { Saira } from 'next/font/google'
import { ReactNode } from 'react'
import { Providers } from '@/app/(modern)/components.client'
import { Toaster } from '@/components/ui/sonner'

const saira = Saira({ subsets: ['latin'], variable: '--font-saira' })

export const metadata = { title: 'Administration' } satisfies Metadata

export const dynamic = 'force-dynamic'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={saira.variable}>
      <body>
        <Providers>
          {children}
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  )
}

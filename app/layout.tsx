import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PDF AI Analyzer',
  description: 'آپلود کنید و هوش مصنوعی PDF شما را تحلیل کند',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={nunito.className}>{children}</body>
    </html>
  )
}

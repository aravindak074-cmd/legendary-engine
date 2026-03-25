import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sentinel FI - The Guardrail Protocol for AI Financial Agents',
  description: 'Making AI agents safe for real-world finance. The open-source guardrail framework that enables autonomous AI agents to safely interact with financial systems.',
  keywords: ['AI agents', 'finance', 'guardrails', 'autonomous agents', 'DeFi', 'compliance', 'risk management'],
  authors: [{ name: 'Sentinel FI Team' }],
  openGraph: {
    title: 'Sentinel FI - Safe AI Finance',
    description: 'The critical infrastructure layer between AI decision-making and actual money movement.',
    type: 'website',
    url: 'https://sentinelfi.org',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sentinel FI',
    description: 'Where AI Meets Money, Safely.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Shield, Zap, TrendingUp, Users, Book, BarChart3 } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Sentinel FI
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors flex items-center space-x-1">
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link href="/agents" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors flex items-center space-x-1">
              <Zap className="h-4 w-4" />
              <span>Agents</span>
            </Link>
            <Link href="/marketplace" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors flex items-center space-x-1">
              <TrendingUp className="h-4 w-4" />
              <span>Marketplace</span>
            </Link>
            <Link href="/observatory" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>Observatory</span>
            </Link>
            <Link href="/docs" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors flex items-center space-x-1">
              <Book className="h-4 w-4" />
              <span>Docs</span>
            </Link>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Connect Wallet
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link href="/dashboard" className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              Dashboard
            </Link>
            <Link href="/agents" className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              Agents
            </Link>
            <Link href="/marketplace" className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              Marketplace
            </Link>
            <Link href="/observatory" className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              Observatory
            </Link>
            <Link href="/docs" className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              Docs
            </Link>
            <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
              Connect Wallet
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

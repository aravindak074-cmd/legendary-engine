import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { Shield, Zap, TrendingUp, Lock, Users, ArrowRight, BarChart3, Award, Globe } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 mb-8">
            <Shield className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">The Guardrail Protocol for AI Financial Agents</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Where AI Meets Money,<br />Safely
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10">
            The open-source framework that validates, constrains, and monitors AI agents 
            before they can access real money. Making autonomous AI finance inevitable and safe.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/dashboard"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg transition-all transform hover:scale-105"
            >
              Launch Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="/docs"
              className="inline-flex items-center justify-center px-8 py-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold text-lg transition-all"
            >
              Read Documentation
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">$50M+</div>
              <div className="text-gray-600 dark:text-gray-400">Assets Under Autonomy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">247</div>
              <div className="text-gray-600 dark:text-gray-400">Validated Agents</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-600 mb-2">0</div>
              <div className="text-gray-600 dark:text-gray-400">Security Breaches</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">99.9%</div>
              <div className="text-gray-600 dark:text-gray-400">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Built for the AI-First Economy</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive guardrails for AI agents across all financial domains
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
                <Lock className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Progressive Trust</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Agents graduate from sandbox to full autonomy through proven performance. 
                Four trust levels with automatic promotion and demotion.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-6">
                <Shield className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Multi-Layer Guardrails</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Policy enforcement, risk limits, compliance checks, and anomaly detection 
                before every single transaction.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <div className="w-14 h-14 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center mb-6">
                <Globe className="h-7 w-7 text-pink-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Multi-Domain Access</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Crypto, TradFi, payments, investments, and real-world spending. 
                One framework for all financial interactions.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Performance Analytics</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Real-time P&L, risk metrics, behavioral analysis, and peer benchmarking. 
                Transparent, tamper-proof records.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <div className="w-14 h-14 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center mb-6">
                <Award className="h-7 w-7 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Verified Marketplace</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Showcase validated agents, license proven strategies, and build reputation 
                based on real performance.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Human-in-the-Loop</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Critical decisions require human oversight until trust thresholds are met. 
                Emergency kill switches always available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How Sentinel FI Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              From registration to full autonomy in four progressive stages
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { level: 'Level 0', title: 'Registration', desc: 'Agent identity created, initial policies defined', color: 'gray' },
              { level: 'Level 1', title: 'Sandbox', desc: 'Paper trading only, full simulation environment', color: 'blue' },
              { level: 'Level 2', title: 'Limited', desc: 'Small capital ($100/day), human approval required', color: 'yellow' },
              { level: 'Level 3', title: 'Autonomous', desc: 'Full limits within guardrails, real-time monitoring', color: 'green' },
            ].map((stage, i) => (
              <div key={i} className="relative">
                <div className={`w-16 h-16 rounded-full bg-${stage.color}-100 dark:bg-${stage.color}-900/30 flex items-center justify-center mb-4`}>
                  <span className={`text-2xl font-bold text-${stage.color}-600`}>{i + 1}</span>
                </div>
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 left-16 w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent" />
                )}
                <h3 className="text-xl font-bold mb-2">{stage.level}: {stage.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{stage.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Deploy Your AI Agent?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Join hundreds of developers building the future of autonomous finance. 
            Open source, secure, and production-ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/dashboard"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="https://github.com/sentinel-fi/sentinel-fi"
              target="_blank"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all"
            >
              View on GitHub
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
                <span className="text-lg font-bold">Sentinel FI</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Making AI agents safe for real-world finance.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link></li>
                <li><Link href="/agents" className="hover:text-blue-600">Agents</Link></li>
                <li><Link href="/marketplace" className="hover:text-blue-600">Marketplace</Link></li>
                <li><Link href="/observatory" className="hover:text-blue-600">Observatory</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link href="/docs" className="hover:text-blue-600">Documentation</Link></li>
                <li><Link href="/about" className="hover:text-blue-600">About Us</Link></li>
                <li><a href="#" className="hover:text-blue-600">Blog</a></li>
                <li><a href="#" className="hover:text-blue-600">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="https://twitter.com/sentinelfi" className="hover:text-blue-600">Twitter</a></li>
                <li><a href="https://discord.gg/sentinelfi" className="hover:text-blue-600">Discord</a></li>
                <li><a href="https://github.com/sentinel-fi" className="hover:text-blue-600">GitHub</a></li>
                <li><a href="mailto:hello@sentinelfi.org" className="hover:text-blue-600">Email</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>&copy; 2024 Sentinel FI. MIT License. Built for a safe AI-first financial future.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

'use client'

import Navbar from '@/components/Navbar'
import { BarChart3, TrendingUp, DollarSign, Activity, Shield, Zap, ArrowUpRight, ArrowDownRight } from 'lucide-react'

const mockAgents = [
  { id: 1, name: 'TreasuryBot Alpha', trustLevel: 'Autonomous', pnl: 12.5, status: 'Active', aum: '$2.4M' },
  { id: 2, name: 'DeFi Optimizer', trustLevel: 'Limited', pnl: 8.3, status: 'Active', aum: '$150K' },
  { id: 3, name: 'Yield Hunter', trustLevel: 'Sandbox', pnl: -2.1, status: 'Testing', aum: '$0' },
  { id: 4, name: 'Arbitrage Pro', trustLevel: 'Autonomous', pnl: 15.7, status: 'Active', aum: '$3.1M' },
]

const mockTransactions = [
  { id: 1, action: 'Swap ETH → USDC', amount: '$50,000', status: 'Approved', time: '2 min ago', agent: 'TreasuryBot Alpha' },
  { id: 2, action: 'Deposit to Aave', amount: '$100,000', status: 'Pending Review', time: '5 min ago', agent: 'DeFi Optimizer' },
  { id: 3, action: 'Buy BTC', amount: '$25,000', status: 'Rejected', time: '12 min ago', agent: 'Yield Hunter' },
  { id: 4, action: 'Stake ETH', amount: '$200,000', status: 'Approved', time: '1 hour ago', agent: 'Arbitrage Pro' },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Monitor your AI agents and their financial activities</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="h-8 w-8 text-blue-600" />
                <span className="text-green-600 flex items-center text-sm font-medium">
                  <ArrowUpRight className="h-4 w-4 mr-1" /> 12.5%
                </span>
              </div>
              <div className="text-2xl font-bold mb-1">$5.65M</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total AUM</div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <span className="text-green-600 flex items-center text-sm font-medium">
                  <ArrowUpRight className="h-4 w-4 mr-1" /> 8.7%
                </span>
              </div>
              <div className="text-2xl font-bold mb-1">$487K</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total P&L (30d)</div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <Activity className="h-8 w-8 text-pink-600" />
                <span className="text-sm text-gray-600 dark:text-gray-400">24 transactions</span>
              </div>
              <div className="text-2xl font-bold mb-1">156</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Transactions (24h)</div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <Shield className="h-8 w-8 text-green-600" />
                <span className="text-sm text-gray-600 dark:text-gray-400">All systems operational</span>
              </div>
              <div className="text-2xl font-bold mb-1">4</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Agents</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Active Agents */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-600" />
                  Active Agents
                </h2>
                <a href="/agents" className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All →</a>
              </div>

              <div className="space-y-4">
                {mockAgents.map((agent) => (
                  <div key={agent.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        agent.trustLevel === 'Autonomous' ? 'bg-green-500' :
                        agent.trustLevel === 'Limited' ? 'bg-yellow-500' : 'bg-gray-400'
                      }`} />
                      <div>
                        <div className="font-semibold">{agent.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {agent.trustLevel} • AUM: {agent.aum}
                        </div>
                      </div>
                    </div>
                    <div className={`text-right ${agent.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      <div className="font-bold">{agent.pnl >= 0 ? '+' : ''}{agent.pnl}%</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{agent.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                  Recent Transactions
                </h2>
                <a href="/observatory" className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All →</a>
              </div>

              <div className="space-y-4">
                {mockTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-semibold">{tx.action}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {tx.agent} • {tx.time}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{tx.amount}</div>
                      <div className={`text-xs font-medium ${
                        tx.status === 'Approved' ? 'text-green-600' :
                        tx.status === 'Pending Review' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {tx.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Chart Placeholder */}
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                Portfolio Performance
              </h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">7D</button>
                <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg">30D</button>
                <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg">90D</button>
                <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg">ALL</button>
              </div>
            </div>
            
            <div className="h-64 bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900/10 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Interactive chart component</p>
                <p className="text-sm">(Integrate Recharts or similar library)</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

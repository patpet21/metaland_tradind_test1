import './styles.css';
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Settings, Bell, Wallet, Activity, History, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

const mockData = [
  {time: '9:00', price: 42100},
  {time: '12:00', price: 42500},
  {time: '15:00', price: 42300},
  {time: '18:00', price: 43000}
];

function TradingInterface() {
  const [activeTab] = useState('trading');

  return (
    <div className="w-full max-w-4xl p-4 space-y-4 bg-gray-900 min-h-screen">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>MetaLand Trading</CardTitle>
            <div className="flex space-x-4">
              <Bell className="w-6 h-6 text-gray-400 cursor-pointer" />
              <Settings className="w-6 h-6 text-gray-400 cursor-pointer" />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Wallet className="w-6 h-6 text-blue-500" />
              <span className="text-sm text-gray-400">Balance</span>
            </div>
            <div className="mt-2 text-xl font-bold">0 USDT</div>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData}>
                <XAxis dataKey="time" />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#3B82F6" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Trading Controls */}
      <div className="grid grid-cols-2 gap-4">
        <button className="p-4 bg-green-500 rounded-lg text-white font-bold">
          <div className="flex items-center justify-center space-x-2">
            <ArrowUpCircle />
            <span>LONG</span>
          </div>
        </button>
        <button className="p-4 bg-red-500 rounded-lg text-white font-bold">
          <div className="flex items-center justify-center space-x-2">
            <ArrowDownCircle />
            <span>SHORT</span>
          </div>
        </button>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700">
        <div className="flex justify-around p-4">
          <button className="flex flex-col items-center text-blue-500">
            <Activity className="w-6 h-6" />
            <span className="text-xs mt-1">Trading</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <Wallet className="w-6 h-6" />
            <span className="text-xs mt-1">Portfolio</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <History className="w-6 h-6" />
            <span className="text-xs mt-1">History</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <Settings className="w-6 h-6" />
            <span className="text-xs mt-1">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TradingInterface;
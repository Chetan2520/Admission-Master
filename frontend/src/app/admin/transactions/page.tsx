"use client";

import { 
  Search, 
  Filter, 
  CreditCard, 
  Download, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreVertical,
  Calendar,
  Eye
} from "lucide-react";
import { useState } from "react";

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const transactions = [
    { id: "TXN-001", student: "Rahul Kumar", package: "VIP NEET Counselling", amount: "₹4,999", date: "24 May 2026, 11:20 AM", status: "Success", method: "UPI", initial: "RK", bg: "bg-teal-100 text-teal-700" },
    { id: "TXN-002", student: "Priya Singh", package: "Premium JEE Prep", amount: "₹8,499", date: "24 May 2026, 10:15 AM", status: "Success", method: "Card", initial: "PS", bg: "bg-blue-100 text-blue-700" },
    { id: "TXN-003", student: "Amit Patel", package: "Basic Counselling", amount: "₹1,999", date: "23 May 2026, 05:45 PM", status: "Pending", method: "UPI", initial: "AP", bg: "bg-purple-100 text-purple-700" },
    { id: "TXN-004", student: "Neha Gupta", package: "VIP NEET Counselling", amount: "₹4,999", date: "23 May 2026, 02:30 PM", status: "Failed", method: "Net Banking", initial: "NG", bg: "bg-rose-100 text-rose-700" },
  ];

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Financial Transactions</h1>
          <p className="text-slate-500">Monitor revenue and payment history</p>
        </div>
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm">
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      {/* Main Container */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search by student or transaction ID..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">
              <Calendar className="w-4 h-4" /> Filter Date
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Transaction Details</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Package</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {transactions.map((txn, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${txn.bg}`}>
                        {txn.initial}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block">{txn.student}</span>
                        <span className="text-xs text-slate-400 font-bold">{txn.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">{txn.amount}</td>
                  <td className="px-6 py-4 text-slate-600 text-xs font-semibold">{txn.package}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                      txn.status === 'Success' ? 'bg-emerald-50 text-emerald-600' : 
                      txn.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 
                      'bg-rose-50 text-rose-600'
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 bg-white border border-slate-200 text-slate-600 hover:text-teal-600 hover:bg-teal-50 transition-colors rounded-lg shadow-sm">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors rounded-lg shadow-sm">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

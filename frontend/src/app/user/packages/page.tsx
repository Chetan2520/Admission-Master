"use client";

import { 
  Calculator, 
  IndianRupee, 
  LineChart, 
  Scale, 
  CheckCircle2, 
  HelpCircle,
  TrendingUp,
  Percent,
  Clock,
  Briefcase,
  Trophy,
  Check,
  X
} from "lucide-react";
import { useState } from "react";

export default function PackagesPage() {
  const [activeTab, setActiveTab] = useState("VIP Packages");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");

  const handleSelectPackage = (pkgName: string) => {
    setSelectedPackage(pkgName);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-[1400px] space-y-6 pb-10">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Financial Tools & Packages</h1>
          <p className="text-slate-500">Calculate ROI, EMIs, and compare college fees</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-2 overflow-x-auto">
        {["VIP Packages", "ROI Calculator", "EMI Calculator", "Fee Comparison"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 px-6 rounded-xl text-sm font-bold flex items-center justify-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === tab
                ? "bg-teal-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            {tab === "VIP Packages" && <CheckCircle2 className="w-4 h-4" />}
            {tab === "ROI Calculator" && <LineChart className="w-4 h-4" />}
            {tab === "EMI Calculator" && <Calculator className="w-4 h-4" />}
            {tab === "Fee Comparison" && <Scale className="w-4 h-4" />}
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="animate-in fade-in duration-300">
        
        {activeTab === "VIP Packages" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {/* Basic Package */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col h-full relative mt-4">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Basic Counselling</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold text-teal-600">₹10K</span>
                <span className="text-sm font-medium text-slate-500">/ 1 Month</span>
              </div>
              <p className="text-xs text-slate-400 mb-8 pb-6 border-b border-slate-100">One-time payment</p>
              
              <ul className="space-y-4 mb-8 flex-1">
                {["Email Support (48hr response)", "College Predictor Access", "Basic Cutoff Analysis", "Scholarship Matching", "Document Checklist", "Counselling Timeline", "Community Forum Access"].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => handleSelectPackage("Basic Counselling")}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl text-sm font-bold transition-colors mt-auto"
              >
                Choose Basic Counselling
              </button>
            </div>

            {/* Premium Package */}
            <div className="bg-white rounded-3xl p-8 border-2 border-teal-500 shadow-md flex flex-col h-full relative z-10 scale-100 md:scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                Most Popular
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Premium Counselling</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold text-teal-600">₹25K</span>
                <span className="text-sm font-medium text-slate-500">/ 3 Months</span>
              </div>
              <p className="text-xs text-slate-400 mb-8 pb-6 border-b border-slate-100">One-time payment</p>
              
              <ul className="space-y-4 mb-8 flex-1">
                {["Dedicated Counsellor", "Priority Phone Support", "Advanced College Strategy", "Choice Filling Assistance", "Document Verification Help", "Seat Matrix Analysis", "ROI & Financial Planning", "Parent Dashboard Access", "Weekly Progress Reviews", "Scholarship Application Help"].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => handleSelectPackage("Premium Counselling")}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl text-sm font-bold transition-colors shadow-sm mt-auto"
              >
                Choose Premium Counselling
              </button>
            </div>

            {/* VIP Elite Package */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col h-full relative mt-4">
              <h3 className="text-xl font-bold text-slate-900 mb-2">VIP Elite</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold text-teal-600">₹50K</span>
                <span className="text-sm font-medium text-slate-500">/ 6 Months</span>
              </div>
              <p className="text-xs text-slate-400 mb-8 pb-6 border-b border-slate-100">One-time payment</p>
              
              <ul className="space-y-4 mb-8 flex-1">
                {["Personal Expert Counsellor", "24/7 Priority Support", "Complete Admission Planning", "Guaranteed Seat Assistance", "Choice Filling Strategy", "Document Preparation", "Interview Preparation", "Scholarship Maximization", "Financial Aid Planning", "Parent Counselling Sessions", "Post-Admission Support", "Career Roadmap Planning"].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => handleSelectPackage("VIP Elite")}
                className="w-full bg-slate-900 hover:bg-black text-white py-3 rounded-xl text-sm font-bold transition-colors shadow-sm mt-auto"
              >
                Choose VIP Elite
              </button>
            </div>
          </div>
        )}

        {activeTab === "ROI Calculator" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">Select College</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: "AIIMS Delhi", type: "Government Medical", loc: "Delhi", selected: true },
                  { name: "IIT Bombay", type: "Government Engineering", loc: "Mumbai", selected: false },
                  { name: "BITS Pilani", type: "Private Engineering", loc: "Pilani", selected: false },
                  { name: "Manipal Medical College", type: "Private Medical", loc: "Manipal", selected: false },
                  { name: "NIT Trichy", type: "Government Engineering", loc: "Trichy", selected: false },
                  { name: "JIPMER Puducherry", type: "Government Medical", loc: "Puducherry", selected: false },
                ].map((col, i) => (
                  <div key={i} className={`p-4 rounded-xl border cursor-pointer transition-all ${col.selected ? 'border-teal-600 bg-teal-50/50 ring-1 ring-teal-600' : 'border-slate-200 hover:border-teal-300 hover:bg-slate-50'}`}>
                    <h4 className="font-bold text-slate-900 text-sm">{col.name}</h4>
                    <p className="text-[10px] text-slate-500 mt-1">{col.type}</p>
                    <p className="text-[10px] text-slate-500">{col.loc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">Financial Parameters</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">Scholarship Amount (₹)</label>
                  <input type="text" value="0" readOnly className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">Loan Interest Rate (%)</label>
                  <input type="text" value="8.5" readOnly className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">Cost Breakdown</h3>
              <div className="space-y-4 text-sm font-semibold text-slate-600">
                <div className="flex justify-between pb-3 border-b border-slate-100">
                  <span>Course Fee (5.5 years)</span>
                  <span className="text-slate-900">₹32,308</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-slate-100">
                  <span>Hostel Fee</span>
                  <span className="text-slate-900">₹1,58,400</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-slate-100">
                  <span>Other Fees</span>
                  <span className="text-slate-900">₹18,500</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-slate-100">
                  <span>Living Expenses</span>
                  <span className="text-slate-900">₹7,20,000</span>
                </div>
                <div className="flex justify-between pt-2 bg-emerald-50/50 p-4 rounded-xl text-emerald-800 border border-emerald-100">
                  <span className="font-bold">Total Investment</span>
                  <span className="font-bold">₹9,33,108</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#24997e] text-white rounded-2xl p-6 shadow-sm relative overflow-hidden h-32 flex flex-col justify-between">
                <TrendingUp className="w-5 h-5 absolute top-6 right-6 text-white/50" />
                <p className="text-sm font-bold text-white/90">Return on Investment</p>
                <div>
                  <h3 className="text-3xl font-bold">28.6%</h3>
                  <p className="text-[10px] text-white/80">First year salary vs total cost</p>
                </div>
              </div>
              <div className="bg-[#d97706] text-white rounded-2xl p-6 shadow-sm relative overflow-hidden h-32 flex flex-col justify-between">
                <Clock className="w-5 h-5 absolute top-6 right-6 text-white/50" />
                <p className="text-sm font-bold text-white/90">Breakeven Period</p>
                <div>
                  <h3 className="text-3xl font-bold">13 months</h3>
                  <p className="text-[10px] text-white/80">Time to recover investment</p>
                </div>
              </div>
              <div className="bg-[#2563eb] text-white rounded-2xl p-6 shadow-sm relative overflow-hidden h-32 flex flex-col justify-between">
                <Briefcase className="w-5 h-5 absolute top-6 right-6 text-white/50" />
                <p className="text-sm font-bold text-white/90">Expected Salary</p>
                <div>
                  <h3 className="text-3xl font-bold">₹12.0L</h3>
                  <p className="text-[10px] text-white/80">Average first year package</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-amber-900 text-sm">Good Investment</h4>
                <p className="text-xs text-amber-700 mt-1">This is a decent investment with good career prospects. Consider applying for scholarships to improve ROI.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "EMI Calculator" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
              <h3 className="font-bold text-slate-900">Loan Details</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-700">Loan Amount</label>
                    <span className="text-sm font-bold text-teal-600">₹5,00,000</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-400 w-[15%]"></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>₹50K</span><span>₹30L</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-700">Interest Rate (per annum)</label>
                    <span className="text-sm font-bold text-teal-600">8.5%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-400 w-[40%]"></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>5%</span><span>15%</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-700">Loan Tenure</label>
                    <span className="text-sm font-bold text-teal-600">5 years</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-400 w-[30%]"></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>1 year</span><span>15 years</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-700">Moratorium Period</label>
                    <span className="text-sm font-bold text-teal-600">0 months</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-400 w-[0%]"></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>0 months</span><span>24 months</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#24997e] rounded-2xl p-8 text-center shadow-md">
              <p className="text-white/80 font-semibold text-sm mb-1">Monthly EMI</p>
              <h2 className="text-4xl font-bold text-white">₹10,258</h2>
              <p className="text-white/70 text-xs mt-2">for 60 months</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm relative">
                <HelpCircle className="w-4 h-4 text-blue-400 absolute top-5 right-5" />
                <p className="text-xs font-bold text-slate-500 mb-1">Principal Amount</p>
                <h3 className="text-xl font-bold text-slate-900">₹5,00,000</h3>
                <p className="text-[10px] text-slate-400">81.2% of total payment</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm relative">
                <Percent className="w-4 h-4 text-orange-400 absolute top-5 right-5" />
                <p className="text-xs font-bold text-slate-500 mb-1">Total Interest</p>
                <h3 className="text-xl font-bold text-slate-900">₹1,15,496</h3>
                <p className="text-[10px] text-slate-400">18.8% of total payment</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm relative">
                <IndianRupee className="w-4 h-4 text-emerald-400 absolute top-5 right-5" />
                <p className="text-xs font-bold text-slate-500 mb-1">Total Payment</p>
                <h3 className="text-xl font-bold text-slate-900">₹6,15,496</h3>
                <p className="text-[10px] text-slate-400">Principal + Interest</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4 text-sm">Payment Distribution</h3>
              <div className="flex h-6 rounded-full overflow-hidden w-full mb-3 shadow-inner">
                <div className="bg-[#3b82f6] h-full flex items-center justify-center text-[10px] text-white font-bold" style={{ width: '81.2%' }}>81%</div>
                <div className="bg-[#f59e0b] h-full" style={{ width: '18.8%' }}></div>
              </div>
              <div className="flex justify-between px-2">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-[#3b82f6]"></div><span className="text-[10px] font-bold text-slate-600">Principal</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-[#f59e0b]"></div><span className="text-[10px] font-bold text-slate-600">Interest</span></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
               <h3 className="font-bold text-slate-900 mb-4 text-sm">Popular Education Loan Providers</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="border border-slate-100 rounded-xl p-4 hover:border-slate-300 transition-colors">
                   <div className="flex justify-between items-start mb-2">
                     <h4 className="font-bold text-slate-900 text-sm">SBI Education Loan</h4>
                     <span className="text-xs font-bold text-slate-600">7.5% - 9.5%</span>
                   </div>
                   <div className="flex justify-between text-xs text-slate-500 mb-1"><span>Max Amount:</span><span className="font-semibold text-slate-700">Upto ₹1.5 Cr</span></div>
                   <div className="flex justify-between text-xs text-slate-500"><span>Processing Fee:</span><span className="font-semibold text-slate-700">0.0%</span></div>
                 </div>
                 <div className="border border-slate-100 rounded-xl p-4 hover:border-slate-300 transition-colors">
                   <div className="flex justify-between items-start mb-2">
                     <h4 className="font-bold text-slate-900 text-sm">HDFC Credila</h4>
                     <span className="text-xs font-bold text-slate-600">9.0% - 11.5%</span>
                   </div>
                   <div className="flex justify-between text-xs text-slate-500 mb-1"><span>Max Amount:</span><span className="font-semibold text-slate-700">Upto ₹1.0 Cr</span></div>
                   <div className="flex justify-between text-xs text-slate-500"><span>Processing Fee:</span><span className="font-semibold text-slate-700">1.0%</span></div>
                 </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === "Fee Comparison" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">Select Colleges to Compare (Max 4)</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                {[
                  { name: "AIIMS Delhi", type: "Government Medical", selected: true },
                  { name: "IIT Bombay", type: "Government Engineering", selected: true },
                  { name: "BITS Pilani", type: "Private Engineering", selected: true },
                  { name: "Manipal Medical College", type: "Private Medical", selected: false },
                  { name: "NIT Trichy", type: "Government Engineering", selected: false },
                  { name: "JIPMER Puducherry", type: "Government Medical", selected: false },
                ].slice(0, 6).map((col, i) => (
                  <div key={i} className={`p-3 rounded-lg border text-sm transition-colors cursor-pointer ${col.selected ? 'border-teal-600 bg-teal-50 text-teal-900' : 'border-slate-200 text-slate-600 hover:border-teal-300'}`}>
                    <h4 className="font-bold">{col.name}</h4>
                    <p className="text-[10px] opacity-70">{col.type}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-6 mt-6 pt-4 border-t border-slate-100">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-teal-600 focus:ring-teal-500" /> Include Hostel Fees
                </label>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-teal-600 focus:ring-teal-500" /> Include Living Expenses
                </label>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
              <table className="w-full text-sm text-left min-w-[800px]">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Parameter</th>
                    <th className="px-6 py-4">
                      <div className="font-bold text-slate-900">AIIMS Delhi</div>
                      <div className="text-[10px] font-medium text-slate-500">Government Medical</div>
                    </th>
                    <th className="px-6 py-4">
                      <div className="font-bold text-slate-900">IIT Bombay</div>
                      <div className="text-[10px] font-medium text-slate-500">Government Engineering</div>
                    </th>
                    <th className="px-6 py-4">
                      <div className="font-bold text-slate-900">BITS Pilani</div>
                      <div className="text-[10px] font-medium text-slate-500">Private Engineering</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
                  <tr>
                    <td className="px-6 py-4">Location</td>
                    <td className="px-6 py-4">Delhi</td>
                    <td className="px-6 py-4">Mumbai</td>
                    <td className="px-6 py-4">Pilani</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">Course Duration</td>
                    <td className="px-6 py-4">5.5 years</td>
                    <td className="px-6 py-4">4 years</td>
                    <td className="px-6 py-4">4 years</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">Annual Course Fee</td>
                    <td className="px-6 py-4 font-bold text-slate-900">₹5,856</td>
                    <td className="px-6 py-4 font-bold text-slate-900">₹2,00,000</td>
                    <td className="px-6 py-4 font-bold text-slate-900">₹4,50,000</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="px-6 py-4">Total Course Fee</td>
                    <td className="px-6 py-4">₹32,208</td>
                    <td className="px-6 py-4">₹8,00,000</td>
                    <td className="px-6 py-4">₹18,00,000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">Annual Hostel Fee</td>
                    <td className="px-6 py-4">₹28,800</td>
                    <td className="px-6 py-4">₹1,80,000</td>
                    <td className="px-6 py-4">₹2,20,000</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="px-6 py-4">Total Hostel Fee</td>
                    <td className="px-6 py-4">₹1,58,400</td>
                    <td className="px-6 py-4">₹7,20,000</td>
                    <td className="px-6 py-4">₹8,80,000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">Other Fees (Annual)</td>
                    <td className="px-6 py-4">₹3,000</td>
                    <td className="px-6 py-4">₹25,000</td>
                    <td className="px-6 py-4">₹40,000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">Monthly Living Cost</td>
                    <td className="px-6 py-4">₹11,000</td>
                    <td className="px-6 py-4">₹18,000</td>
                    <td className="px-6 py-4">₹17,000</td>
                  </tr>
                  <tr className="bg-emerald-50/30">
                    <td className="px-6 py-4 font-bold text-slate-900">Total Investment</td>
                    <td className="px-6 py-4 font-bold text-emerald-700">₹9,33,108</td>
                    <td className="px-6 py-4 font-bold text-emerald-700">₹23,40,000</td>
                    <td className="px-6 py-4 font-bold text-emerald-700">₹52,00,000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">Avg. Placement</td>
                    <td className="px-6 py-4">₹12.0L</td>
                    <td className="px-6 py-4">₹21.0L</td>
                    <td className="px-6 py-4">₹18.0L</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">ROI</td>
                    <td className="px-6 py-4 font-bold text-teal-600">28.6%</td>
                    <td className="px-6 py-4 font-bold text-slate-700">80.3%</td>
                    <td className="px-6 py-4 font-bold text-slate-700">35.4%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">Scholarship Available</td>
                    <td className="px-6 py-4 text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Yes</td>
                    <td className="px-6 py-4 text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Yes</td>
                    <td className="px-6 py-4 text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-[#24997e] rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex gap-4 items-center md:items-start">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Best Value Recommendation</h3>
                  <p className="text-white/80 text-sm">Based on ROI analysis, <span className="font-bold text-white">AIIMS Delhi</span> offers the best value with 28.6% return on investment.</p>
                </div>
              </div>
              <div className="flex gap-8 text-center flex-shrink-0">
                <div>
                  <h4 className="text-2xl font-bold">₹9.3L</h4>
                  <p className="text-[10px] text-white/80 uppercase tracking-wider">Total Cost</p>
                </div>
                <div>
                  <h4 className="text-2xl font-bold">₹12.0L</h4>
                  <p className="text-[10px] text-white/80 uppercase tracking-wider">Avg Package</p>
                </div>
                <div>
                  <h4 className="text-2xl font-bold">28.6%</h4>
                  <p className="text-[10px] text-white/80 uppercase tracking-wider">ROI</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Package Selection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-emerald-500" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Package Selected!</h2>
              <p className="text-sm text-slate-600">
                You've selected the <span className="font-bold text-teal-600">{selectedPackage}</span> package
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <input type="text" placeholder="Full Name" className="w-full bg-white border border-slate-200 text-slate-900 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
              <input type="email" placeholder="Email Address" className="w-full bg-white border border-slate-200 text-slate-900 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
              <input type="tel" placeholder="Phone Number" className="w-full bg-white border border-slate-200 text-slate-900 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 rounded-xl text-sm font-bold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 py-3 rounded-xl text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-sm transition-colors">
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

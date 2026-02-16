import React, { useState, useEffect } from "react";
import {
    FiDollarSign, FiCheckCircle, FiClock, FiShield,
    FiCreditCard, FiSmartphone, FiHome, FiSettings,
    FiActivity, FiArrowUpRight, FiLock, FiGlobe,
    FiCpu, FiZap, FiBarChart2
} from "react-icons/fi";

const NetBanking = () => {
    const [activeTab, setActiveTab] = useState("transactions");
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const generateMockBanking = () => {
            const methods = ["UPI", "Net Banking", "Credit Card", "Debit Card", "Wallet"];
            const banks = ["HDFC Bank", "SBI Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra"];
            const mockData = [];
            for (let i = 0; i < 12; i++) {
                mockData.push({
                    id: `TXN-${2000 + i}`,
                    user: `User_${Math.floor(Math.random() * 500)}`,
                    bank: banks[Math.floor(Math.random() * banks.length)],
                    method: methods[Math.floor(Math.random() * methods.length)],
                    amount: (Math.random() * 45000 + 1000).toFixed(2),
                    time: new Date(Date.now() - Math.random() * 100000000).toLocaleString(),
                    status: Math.random() > 0.15 ? "Verified" : "Flagged",
                    account: `****${Math.floor(1000 + Math.random() * 9000)}`
                });
            }
            setTransactions(mockData);
            setLoading(false);
        };
        generateMockBanking();
    }, []);

    const gateways = [
        { name: "UPI Nexus", status: "Active", icon: <FiSmartphone />, color: "bg-green-500", health: "99.9%" },
        { name: "Card Secure", status: "Maintenance", icon: <FiCreditCard />, color: "bg-yellow-500", health: "92.4%" },
        { name: "NetBridge", status: "Active", icon: <FiHome />, color: "bg-blue-500", health: "100%" },
        { name: "Global Pay", status: "Encrypted", icon: <FiGlobe />, color: "bg-purple-500", health: "98.1%" },
    ];

    const StatCard = ({ title, value, icon, trend, color, subValue }) => (
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all group overflow-hidden relative">
            <div className={`absolute top-0 right-0 w-32 h-32 ${color} opacity-5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700`}></div>
            <div className="flex justify-between items-start relative z-10">
                <div>
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{title}</p>
                    <h3 className="text-3xl font-black text-slate-800 tracking-tighter">{value}</h3>
                    <div className="flex items-center gap-2 mt-2">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${trend.includes('+') ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                            {trend}
                        </span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase">{subValue}</span>
                    </div>
                </div>
                <div className={`p-4 rounded-2xl ${color} text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                    {icon}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f0f4f8] font-poppins text-slate-800 p-4 md:p-10 selection:bg-blue-100">
            {/* Command Header */}
            <div className="max-w-7xl mx-auto flex flex-col lg:row justify-between items-center mb-12 gap-8">
                <div className="text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 bg-blue-100/50 px-4 py-1.5 rounded-full text-blue-600 mb-4 border border-blue-200/50">
                        <FiCpu className="animate-spin-slow" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Fintech Neural Core V2.0</span>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none mb-2">
                        Banking <span className="text-blue-600">Infrastructure</span>
                    </h1>
                    <p className="text-slate-400 text-sm font-bold tracking-tight">Enterprise Asset Settlement & Quantum Ledger Management</p>
                </div>

                <div className="flex flex-wrap justify-center bg-white/50 backdrop-blur-md p-1.5 rounded-[2rem] shadow-xl border border-white gap-1">
                    {[
                        { id: "transactions", label: "Ledger", icon: <FiActivity /> },
                        { id: "accounts", label: "Accounts", icon: <FiHome /> },
                        { id: "gateways", label: "Gateways", icon: <FiSettings /> },
                        { id: "analytics", label: "Analytics", icon: <FiBarChart2 /> }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all ${activeTab === tab.id
                                ? "bg-slate-900 text-white shadow-2xl shadow-slate-900/30 scale-105"
                                : "text-slate-400 hover:text-slate-600 hover:bg-white"
                                }`}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Top Statistics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <StatCard title="Liquidity Hub" value="₹1.48Cr" trend="+14.2%" subValue="Yield" icon={<FiDollarSign size={24} />} color="bg-blue-600" />
                    <StatCard title="Clearing Node" value="99.98%" trend="+0.02%" subValue="Uptime" icon={<FiZap size={24} />} color="bg-amber-500" />
                    <StatCard title="Settlement" value="84ms" trend="-12ms" subValue="Latency" icon={<FiActivity size={24} />} color="bg-indigo-600" />
                    <StatCard title="Security Layer" value="V-EAL7" trend="Certified" subValue="Level" icon={<FiShield size={24} />} color="bg-slate-900" />
                </div>

                {activeTab === "accounts" ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                        {/* Primary Bank Account */}
                        <div className="bg-white rounded-[3rem] p-10 shadow-xl border border-blue-50 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform">
                                <FiHome size={120} />
                            </div>
                            <div className="relative z-10">
                                <span className="px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">Primary Settlement</span>
                                <h3 className="text-3xl font-black text-slate-900 mt-6 mb-8 tracking-tighter">HDFC Corporate</h3>
                                <div className="space-y-6">
                                    <div className="flex justify-between border-b border-slate-50 pb-4">
                                        <span className="text-xs font-bold text-slate-400 uppercase">Account Holder</span>
                                        <span className="text-sm font-black text-slate-700">AUCTION_SYS_PVT_LTD</span>
                                    </div>
                                    <div className="flex justify-between border-b border-slate-50 pb-4">
                                        <span className="text-xs font-bold text-slate-400 uppercase">Account Number</span>
                                        <span className="text-sm font-black text-slate-700 text-[16px]">50200012345678</span>
                                    </div>
                                    <div className="flex justify-between border-b border-slate-50 pb-4">
                                        <span className="text-xs font-bold text-slate-400 uppercase">IFSC Code</span>
                                        <span className="text-sm font-black text-slate-700">HDFC0001234</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-xs font-bold text-slate-400 uppercase">Branch</span>
                                        <span className="text-sm font-black text-slate-700 text-right">MUMBAI CENTRAL</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Secondary SBI Account */}
                        <div className="bg-white rounded-[3rem] p-10 shadow-xl border border-slate-50 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform">
                                <FiHome size={120} />
                            </div>
                            <div className="relative z-10">
                                <span className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-widest">Reserve Node</span>
                                <h3 className="text-3xl font-black text-slate-900 mt-6 mb-8 tracking-tighter">SBI Vault</h3>
                                <div className="space-y-6">
                                    <div className="flex justify-between border-b border-slate-50 pb-4">
                                        <span className="text-xs font-bold text-slate-400 uppercase">Account Holder</span>
                                        <span className="text-sm font-black text-slate-700">AUCTION_RESERVE_TR</span>
                                    </div>
                                    <div className="flex justify-between border-b border-slate-50 pb-4">
                                        <span className="text-xs font-bold text-slate-400 uppercase">Account Number</span>
                                        <span className="text-sm font-black text-slate-700 text-[16px]">334455667788</span>
                                    </div>
                                    <div className="flex justify-between border-b border-slate-50 pb-4">
                                        <span className="text-xs font-bold text-slate-400 uppercase">IFSC Code</span>
                                        <span className="text-sm font-black text-slate-700">SBIN0005678</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-xs font-bold text-slate-400 uppercase">Branch</span>
                                        <span className="text-sm font-black text-slate-700 text-right">NARIMAN POINT</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* UPI QR Visual Section */}
                        <div className="bg-slate-900 rounded-[3rem] p-10 shadow-2xl text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="p-4 bg-white rounded-3xl mb-6 shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                                    <div className="w-32 h-32 bg-slate-100 flex items-center justify-center p-2 rounded-2xl">
                                        <div className="grid grid-cols-4 gap-1 w-full h-full opacity-80">
                                            {[...Array(16)].map((_, i) => (
                                                <div key={i} className={`rounded-sm ${i % 3 === 0 ? 'bg-slate-900' : 'bg-slate-300'}`}></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black tracking-tighter mb-2 italic text-blue-400">MASTER GATEWAY</h3>
                                <p className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-6 opacity-60">Verified Infrastructure</p>
                                <div className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl mb-4">
                                    <p className="text-[8px] text-slate-500 font-black uppercase mb-1">Global VPA</p>
                                    <p className="text-sm font-black tracking-tight text-white font-mono break-all">auction.settle@axisbank</p>
                                </div>
                            </div>
                        </div>

                        {/* traditional bank accounts only in this view */}
                    </div>
                ) : activeTab === "digital" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                        {/* Google Pay Section */}
                        <div className="bg-gradient-to-br from-[#4285F4] to-[#34a853] rounded-[3rem] p-10 shadow-2xl text-white relative overflow-hidden group">
                            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="p-4 bg-white rounded-2xl shadow-xl">
                                        <FiSmartphone className="text-[#4285F4]" size={24} />
                                    </div>
                                    <span className="text-[10px] font-black bg-black/20 px-4 py-1.5 rounded-full uppercase tracking-widest border border-white/10">Google Pay Biz</span>
                                </div>
                                <h3 className="text-3xl font-black tracking-tighter mb-6 leading-none text-white">G-Pay <br />Business</h3>
                                <div className="space-y-4">
                                    <div className="bg-black/10 p-4 rounded-2xl backdrop-blur-md">
                                        <p className="text-[10px] font-black text-white/60 uppercase mb-1">Merchant VPA</p>
                                        <p className="text-sm font-bold font-mono">auction.pay@okaxis</p>
                                    </div>
                                    <div className="bg-white/10 p-4 rounded-2xl">
                                        <p className="text-xs font-bold">Settlement: Real-time</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Paytm Section */}
                        <div className="bg-[#00BAF2] rounded-[3rem] p-10 shadow-2xl text-white relative overflow-hidden group">
                            <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="p-4 bg-slate-900 rounded-2xl shadow-xl">
                                        <FiZap className="text-[#00BAF2]" size={24} />
                                    </div>
                                    <span className="text-[10px] font-black bg-white/20 px-4 py-1.5 rounded-full uppercase tracking-widest">Paytm Enterprise</span>
                                </div>
                                <h3 className="text-3xl font-black tracking-tighter mb-6 leading-none">Paytm <br />Secure</h3>
                                <div className="space-y-4">
                                    <div className="bg-slate-900/20 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                                        <p className="text-[10px] font-black text-white/70 uppercase mb-1">E-Wallet ID</p>
                                        <p className="text-sm font-bold font-mono text-slate-800 tracking-tighter">98XXXXXXXX@paytm</p>
                                    </div>
                                    <div className="bg-slate-900/20 p-4 rounded-2xl border border-white/10">
                                        <p className="text-xs font-bold text-slate-800">Settlement: Instant</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* PhonePe Section */}
                        <div className="bg-[#6739b7] rounded-[3rem] p-10 shadow-2xl text-white relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-800 to-transparent opacity-50"></div>
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="p-4 bg-white rounded-2xl shadow-xl text-[#6739b7]">
                                        <FiSmartphone size={24} />
                                    </div>
                                    <span className="text-[10px] font-black bg-white/10 px-4 py-1.5 rounded-full uppercase tracking-widest">PhonePe Biz</span>
                                </div>
                                <h3 className="text-3xl font-black tracking-tighter mb-6 leading-none">PhonePe <br />Global</h3>
                                <div className="space-y-4">
                                    <div className="bg-black/20 p-4 rounded-2xl backdrop-blur-md">
                                        <p className="text-[10px] font-black text-white/60 uppercase mb-1">UPI Alias</p>
                                        <p className="text-sm font-bold font-mono">auction@ybl</p>
                                    </div>
                                    <div className="bg-white/10 p-4 rounded-2xl">
                                        <p className="text-xs font-bold">Status: Online (99.9%)</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Amazon Pay Section */}
                        <div className="bg-[#232f3e] rounded-[3rem] p-10 shadow-2xl text-white relative overflow-hidden group border border-amber-500/20">
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl"></div>
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="p-4 bg-[#ff9900] rounded-2xl shadow-xl text-white">
                                        <FiGlobe size={24} />
                                    </div>
                                    <span className="text-[10px] font-black bg-amber-500/10 text-amber-500 px-4 py-1.5 rounded-full uppercase tracking-widest">Amazon Pay</span>
                                </div>
                                <h3 className="text-3xl font-black tracking-tighter mb-6 leading-none text-white">AMZN <br />Wallet</h3>
                                <div className="space-y-4">
                                    <div className="bg-white/5 p-4 rounded-2xl backdrop-blur-md border border-white/5">
                                        <p className="text-[10px] font-black text-white/40 uppercase mb-1">Store ID</p>
                                        <p className="text-sm font-bold font-mono">amzn.settle.102</p>
                                    </div>
                                    <div className="bg-[#ff9900]/10 p-4 rounded-2xl">
                                        <p className="text-xs font-bold text-amber-500">Auto-Reconcile: Active</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* WhatsApp Pay Section */}
                        <div className="bg-[#25D366] rounded-[3rem] p-10 shadow-2xl text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
                                <FiSmartphone size={100} />
                            </div>
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="p-4 bg-white rounded-2xl shadow-xl text-[#25D366]">
                                        <FiCheckCircle size={24} />
                                    </div>
                                    <span className="text-[10px] font-black bg-black/10 px-4 py-1.5 rounded-full uppercase tracking-widest">WA Pay Biz</span>
                                </div>
                                <h3 className="text-3xl font-black tracking-tighter mb-6 leading-none">WhatsApp <br />Settle</h3>
                                <div className="space-y-4">
                                    <div className="bg-black/10 p-4 rounded-2xl backdrop-blur-md">
                                        <p className="text-[10px] font-black text-white/60 uppercase mb-1">VPA Handle</p>
                                        <p className="text-sm font-bold font-mono">auction@wa</p>
                                    </div>
                                    <div className="bg-white/20 p-4 rounded-2xl">
                                        <p className="text-xs font-bold">Protocol: End-to-End</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Transactions Ledger */}
                        <div className="lg:col-span-8">
                            <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] shadow-[0_40px_80px_rgba(0,0,0,0.03)] border border-white overflow-hidden">
                                <div className="p-10 border-b border-slate-100 flex justify-between items-center group">
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Active Settlement Feed</h2>
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Cross-Platform Asset Verification</p>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <div className="flex items-center gap-2 h-6 px-3 bg-emerald-100 rounded-full">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Live Sync</span>
                                        </div>
                                        <p className="text-[10px] text-slate-300 font-bold mt-2 font-mono">NODE_HASH: 0xFD...8A</p>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-slate-50/50">
                                                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Transaction / Bank</th>
                                                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Payment Matrix</th>
                                                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Value (INR)</th>
                                                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Compliance</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {transactions.map((txn, idx) => (
                                                <tr key={txn.id} className="hover:bg-blue-50/50 transition-all cursor-pointer group">
                                                    <td className="px-10 py-6">
                                                        <div className="flex items-center gap-5">
                                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center font-black text-white shadow-lg group-hover:scale-110 transition-transform">
                                                                {txn.bank[0]}
                                                            </div>
                                                            <div>
                                                                <p className="font-black text-slate-800 tracking-tight text-lg">{txn.user}</p>
                                                                <div className="flex items-center gap-2 opacity-50 font-mono text-[10px] font-bold">
                                                                    <span>{txn.id}</span>
                                                                    <span className="w-1 h-1 rounded-full bg-slate-400"></span>
                                                                    <span>{txn.bank}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-10 py-6">
                                                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-100 rounded-2xl group-hover:bg-white transition-colors">
                                                            <span className="text-slate-900">
                                                                {txn.method === "UPI" ? <FiSmartphone size={16} /> : <FiCreditCard size={16} />}
                                                            </span>
                                                            <span className="text-xs font-black text-slate-700 uppercase tracking-widest">{txn.method}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-10 py-6 text-right">
                                                        <p className="text-xl font-black text-slate-900">₹{parseFloat(txn.amount).toLocaleString()}</p>
                                                        <p className="text-[10px] text-slate-400 font-black tracking-[0.2em] mt-1">{txn.account}</p>
                                                    </td>
                                                    <td className="px-10 py-6">
                                                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/10 ${txn.status === "Verified" ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
                                                            }`}>
                                                            {txn.status === "Verified" ? <FiCheckCircle /> : <FiClock />}
                                                            {txn.status}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Payment Infrastructure Config */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-[0_50px_100px_rgba(0,0,0,0.2)] relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>

                                <div className="flex items-center justify-between mb-10 relative z-10">
                                    <h3 className="text-2xl font-black tracking-tighter">Gateway Config</h3>
                                    <button className="p-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-all">
                                        <FiSettings />
                                    </button>
                                </div>

                                <div className="space-y-6 relative z-10">
                                    {gateways.map((g) => (
                                        <div key={g.name} className="p-6 bg-white/5 border border-white/5 rounded-[2rem] hover:bg-white/10 hover:translate-x-2 transition-all cursor-pointer">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-4">
                                                    <div className={`p-4 rounded-2xl ${g.color} text-white shadow-xl`}>
                                                        {g.icon}
                                                    </div>
                                                    <div>
                                                        <p className="text-lg font-black tracking-tight">{g.name}</p>
                                                        <div className="flex items-center gap-2">
                                                            <div className={`w-1.5 h-1.5 rounded-full ${g.status === 'Active' ? 'bg-green-400' : 'bg-amber-400'}`}></div>
                                                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{g.status}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-base font-black text-blue-400 tracking-tighter">{g.health}</p>
                                                    <p className="text-[10px] text-slate-500 font-bold uppercase">Health</p>
                                                </div>
                                            </div>
                                            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full transition-all duration-1000 ${g.status === 'Active' ? 'bg-blue-400' : 'bg-amber-400'}`}
                                                    style={{ width: g.health }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button className="w-full mt-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] transition-all shadow-2xl shadow-blue-600/30 active:scale-95">
                                    Initialize Reconciliation
                                </button>
                            </div>

                            {/* Encryption Card */}
                            <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-700 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-150 transition-transform duration-700">
                                    <FiLock size={80} />
                                </div>
                                <div className="relative z-10">
                                    <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/20">
                                        <FiShield size={28} />
                                    </div>
                                    <h3 className="text-2xl font-black leading-tight mb-4 tracking-tight">Quantum Safe Connection</h3>
                                    <p className="text-indigo-100/70 text-sm font-bold leading-relaxed mb-6 uppercase tracking-widest text-[10px]">Active Protocol: AES-512 Bit RSA</p>
                                    <div className="flex items-center gap-2 text-xs font-black px-4 py-2 bg-black/20 rounded-xl w-fit">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_10px_#4ade80]"></div>
                                        SECURE_ENDPOINT: ENABLED
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
				.animate-spin-slow {
					animation: spin 6s linear infinite;
				}
				@keyframes spin {
					from { transform: rotate(0deg); }
					to { transform: rotate(360deg); }
				}
				::selection {
					background-color: #3b82f6;
					color: white;
				}
			`}</style>
        </div>
    );
};

export default NetBanking;

// "use client";
import React from 'react';
import { BarChart, PieChart, FileText, Download } from 'lucide-react';

export default function DashboardReportPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard & Reports</h1>
                    <p className="text-gray-500">Analytical insights and downloadable reports.</p>
                </div>
            </div>

            {/* Mock Charts Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-80 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                            <BarChart className="h-4 w-4 text-blue-500" /> Daily Throughput
                        </h3>
                    </div>
                    <div className="flex-1 bg-gray-50 rounded flex items-center justify-center text-gray-400 text-sm">
                        [Bar Chart Placeholder]
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-80 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                            <PieChart className="h-4 w-4 text-purple-500" /> Capacity Utilization
                        </h3>
                    </div>
                    <div className="flex-1 bg-gray-50 rounded flex items-center justify-center text-gray-400 text-sm">
                        [Pie Chart Placeholder]
                    </div>
                </div>
            </div>

            {/* Report List */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 font-semibold text-gray-800">
                    Available Reports
                </div>
                <ul className="divide-y divide-gray-100">
                    {[1, 2, 3].map((i) => (
                        <li key={i} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 rounded text-blue-600">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Monthly Operational Summary - Oct 2023</p>
                                    <p className="text-xs text-gray-500">Generated on 01 Nov 2023</p>
                                </div>
                            </div>
                            <button className="text-gray-400 hover:text-blue-600">
                                <Download className="h-5 w-5" />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

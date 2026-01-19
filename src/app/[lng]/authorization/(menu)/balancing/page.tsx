"use client";
import React from 'react';
import DataTable from '@/components/tables/DataTable';
import { Activity, AlertTriangle, CheckCircle } from 'lucide-react';
import { clsx } from 'clsx';

const BALANCING_DATA = [
    { id: 'B-001', zone: 'North Zone', imbalance: 45, threshold: 100, status: 'Normal' },
    { id: 'B-002', zone: 'East Zone', imbalance: -120, threshold: 100, status: 'Critical' },
    { id: 'B-003', zone: 'West Zone', imbalance: 10, threshold: 100, status: 'Normal' },
    { id: 'B-004', zone: 'South Zone', imbalance: 85, threshold: 100, status: 'Warning' },
];

const columns = [
    { header: 'Zone ID', accessor: 'id' as const },
    { header: 'Zone Name', accessor: 'zone' as const },
    {
        header: 'Current Imbalance', accessor: (row: typeof BALANCING_DATA[0]) => (
            <span className={row.imbalance < 0 ? 'text-red-600 font-bold' : 'text-gray-800'}>
                {row.imbalance > 0 ? `+${row.imbalance}` : row.imbalance}
            </span>
        )
    },
    { header: 'Tolerance Threshold', accessor: 'threshold' as const },
    {
        header: 'Status', accessor: (row: typeof BALANCING_DATA[0]) => (
            <div className="flex items-center gap-2">
                {row.status === 'Critical' && <AlertTriangle className="h-4 w-4 text-red-500" />}
                {row.status === 'Warning' && <Activity className="h-4 w-4 text-yellow-500" />}
                {row.status === 'Normal' && <CheckCircle className="h-4 w-4 text-green-500" />}
                <span>{row.status}</span>
            </div>
        )
    },
];

export default function BalancingPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">System Balancing</h1>
                    <p className="text-gray-500">Real-time zonal imbalance monitoring.</p>
                </div>
            </div>

            {/* Visual Balance Indicator (Mock) */}
            <div className="bg-gray-900 rounded-xl p-8 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-red-500 via-green-500 to-red-500"></div>
                <h2 className="text-xl font-medium mb-4">Overall System Status</h2>
                <div className="flex justify-center items-center gap-4">
                    <span className="text-4xl font-mono text-green-400 font-bold">STABLE</span>
                    <span className="px-3 py-1 bg-gray-800 rounded text-sm text-gray-400">Net Imbalance: +20</span>
                </div>
                <div className="mt-6 h-2 w-full bg-gray-700 rounded-full overflow-hidden relative max-w-lg mx-auto">
                    {/* Center Marker */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white z-10"></div>
                    {/* Value Marker (slightly right) */}
                    <div className="absolute left-[52%] top-0 bottom-0 w-2 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
                </div>
                <div className="max-w-lg mx-auto flex justify-between text-xs text-gray-500 mt-2">
                    <span>Short (-500)</span>
                    <span>Long (+500)</span>
                </div>
            </div>

            <DataTable
                title="Zonal Imbalance Report"
                data={BALANCING_DATA}
                columns={columns}
            />
        </div>
    );
}

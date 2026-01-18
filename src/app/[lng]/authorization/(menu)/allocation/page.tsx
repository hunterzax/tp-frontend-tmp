'use client';
import React from 'react';
import DataTable from '@/components/tables/DataTable';
import { RefreshCcw } from 'lucide-react';
import { clsx } from 'clsx';

// Mock Data
const ALLOCATION_DATA = [
    { id: 'AL-1001', date: '2023-10-01', location: 'Point A', requested: 5000, allocated: 5000, status: 'Confirmed' },
    { id: 'AL-1002', date: '2023-10-01', location: 'Point B', requested: 3200, allocated: 3000, status: 'Partial' },
    { id: 'AL-1003', date: '2023-10-02', location: 'Point A', requested: 5100, allocated: 5100, status: 'Confirmed' },
    { id: 'AL-1004', date: '2023-10-02', location: 'Point C', requested: 1000, allocated: 0, status: 'Rejected' },
    { id: 'AL-1005', date: '2023-10-03', location: 'Point B', requested: 3300, allocated: 3300, status: 'Confirmed' },
    { id: 'AL-1006', date: '2023-10-03', location: 'Point A', requested: 5200, allocated: 5200, status: 'Confirmed' },
];

const columns = [
    { header: 'ID', accessor: 'id' as const },
    { header: 'Date', accessor: 'date' as const },
    { header: 'Location', accessor: 'location' as const },
    { header: 'Requested (MMBTU)', accessor: 'requested' as const, className: 'text-right' },
    { header: 'Allocated (MMBTU)', accessor: 'allocated' as const, className: 'text-right' },
    {
        header: 'Status', accessor: (row: typeof ALLOCATION_DATA[0]) => (
            <span className={clsx(
                "px-2 py-1 rounded text-xs font-medium",
                row.status === 'Confirmed' ? "bg-green-100 text-green-800" :
                    row.status === 'Partial' ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
            )}>
                {row.status}
            </span>
        )
    },
];

export default function AllocationPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Gas Allocation</h1>
                    <p className="text-gray-500">Monitor daily gas allocation vs requested volumes.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 text-sm text-gray-700">
                    <RefreshCcw className="h-4 w-4" /> Refresh Data
                </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-600 rounded-lg p-6 text-white shadow">
                    <h3 className="text-blue-100 text-sm font-medium uppercase">Total Allocated (Today)</h3>
                    <p className="text-3xl font-bold mt-2">12,500 <span className="text-lg font-normal opacity-75">MMBTU</span></p>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Confirmation Rate</h3>
                    <p className="text-3xl font-bold mt-2 text-gray-800">92%</p>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Pending Requests</h3>
                    <p className="text-3xl font-bold mt-2 text-yellow-600">3</p>
                </div>
            </div>

            <DataTable
                title="Daily Allocation Records"
                data={ALLOCATION_DATA}
                columns={columns}
            />
        </div>
    );
}

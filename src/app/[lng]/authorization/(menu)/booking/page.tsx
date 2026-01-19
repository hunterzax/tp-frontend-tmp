"use client";
import React from 'react';
import DataTable from '@/components/tables/DataTable';
import { Plus } from 'lucide-react';
import { clsx } from 'clsx';

const BOOKING_DATA = [
    { id: 'BK-2023-001', type: 'Firm', capacity: 10000, start: '2024-01-01', end: '2024-12-31', status: 'Active' },
    { id: 'BK-2023-002', type: 'Interruptible', capacity: 5000, start: '2024-03-01', end: '2024-03-31', status: 'Pending' },
    { id: 'BK-2023-003', type: 'Firm', capacity: 20000, start: '2024-01-01', end: '2025-01-01', status: 'Active' },
    { id: 'BK-2023-004', type: 'Backhaul', capacity: 2000, start: '2023-11-01', end: '2023-11-05', status: 'Expired' },
];

const columns = [
    { header: 'Booking Ref', accessor: 'id' as const },
    { header: 'Service Type', accessor: 'type' as const },
    { header: 'Capacity (MMBTU/d)', accessor: 'capacity' as const, className: 'text-right font-mono' },
    { header: 'Start Date', accessor: 'start' as const },
    { header: 'End Date', accessor: 'end' as const },
    {
        header: 'Status', accessor: (row: typeof BOOKING_DATA[0]) => (
            <span className={clsx(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                row.status === 'Active' ? "bg-green-100 text-green-800" :
                    row.status === 'Pending' ? "bg-blue-100 text-blue-800" :
                        "bg-gray-100 text-gray-800"
            )}>
                {row.status}
            </span>
        )
    },
];

export default function BookingPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Capacity Booking</h1>
                    <p className="text-gray-500">Manage long-term and short-term capacity reservations.</p>
                </div>
                <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-sm transition-all text-sm font-medium">
                    <Plus className="h-5 w-5" /> New Booking
                </button>
            </div>

            {/* Filters Mockup */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-wrap gap-4 items-center">
                <select className="border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 p-2 border">
                    <option>All Service Types</option>
                    <option>Firm</option>
                    <option>Interruptible</option>
                </select>
                <select className="border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 p-2 border">
                    <option>All Statuses</option>
                    <option>Active</option>
                    <option>Pending</option>
                </select>
                <div className="flex-1"></div>
                <span className="text-sm text-gray-500">Total Booked Capacity: 35,000</span>
            </div>

            <DataTable
                data={BOOKING_DATA}
                columns={columns}
                title="Booking Registry"
            />
        </div>
    );
}

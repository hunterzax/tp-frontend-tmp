"use client";
import React from 'react';
import DataTable from '@/components/tables/DataTable';
import { Calendar, PenTool } from 'lucide-react';
import { clsx } from 'clsx';

const PLAN_DATA = [
    { id: 'PLN-24-001', title: 'Main Line Pigging', start: '2024-05-01', end: '2024-05-03', impact: 'Reduced Capacity', status: 'Approved' },
    { id: 'PLN-24-002', title: 'Compressor Station A Maintenance', start: '2024-06-10', end: '2024-06-15', impact: 'None', status: 'Draft' },
];

const columns = [
    { header: 'Plan ID', accessor: 'id' as const },
    { header: 'Activity', accessor: 'title' as const },
    { header: 'Start Date', accessor: 'start' as const },
    { header: 'End Date', accessor: 'end' as const },
    { header: 'Operational Impact', accessor: 'impact' as const },
    {
        header: 'Status', accessor: (row: typeof PLAN_DATA[0]) => (
            <span className={clsx(
                "px-2 py-1 rounded text-xs font-medium",
                row.status === 'Approved' ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
            )}>
                {row.status}
            </span>
        )
    },
];

export default function PlanningPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Operational Planning</h1>
                    <p className="text-gray-500">Maintenance schedules and forecast scenarios.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    <Calendar className="h-4 w-4" /> Create Schedule
                </button>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <PenTool className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                            Upcoming maintenance on Compressor #3 might affect capacity on <b>Nov 25th</b>. Please adjust nominations accordingly.
                        </p>
                    </div>
                </div>
            </div>

            <DataTable
                title="Planned Maintenance Activities (2024)"
                data={PLAN_DATA}
                columns={columns}
            />
        </div>
    );
}

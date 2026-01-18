'use client';
import React from 'react';
import DataTable from '@/components/tables/DataTable';
import { AlertCircle, Info, AlertTriangle } from 'lucide-react';

const EVENT_DATA = [
    { id: 'EVT-001', severity: 'Error', source: 'SCADA', message: 'Communication loss with Meter M-102', time: '10:15:00' },
    { id: 'EVT-002', severity: 'Warning', source: 'Balancing', message: 'Zone B imbalance approaching threshold', time: '10:12:00' },
    { id: 'EVT-003', severity: 'Info', source: 'System', message: 'Daily report generated successfully', time: '09:00:00' },
    { id: 'EVT-004', severity: 'Info', source: 'Auth', message: 'User Login: admin', time: '08:55:00' },
];

const columns = [
    { header: 'Time', accessor: 'time' as const },
    { header: 'Source', accessor: 'source' as const },
    {
        header: 'Severity', accessor: (row: typeof EVENT_DATA[0]) => (
            <div className="flex items-center gap-2">
                {row.severity === 'Error' && <AlertCircle className="h-4 w-4 text-red-500" />}
                {row.severity === 'Warning' && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                {row.severity === 'Info' && <Info className="h-4 w-4 text-blue-500" />}
                <span>{row.severity}</span>
            </div>
        )
    },
    { header: 'Message', accessor: 'message' as const, className: 'w-1/2' },
];

export default function EventPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Event Logs</h1>
                    <p className="text-gray-500">System alarms, warnings, and audit trails.</p>
                </div>
            </div>

            <DataTable
                title="System Events"
                data={EVENT_DATA}
                columns={columns}
            />
        </div>
    );
}

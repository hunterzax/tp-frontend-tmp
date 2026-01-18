'use client';
import React from 'react';
import DataTable from '@/components/tables/DataTable';
import { Gauge, Zap, TrendingUp } from 'lucide-react';
import { clsx } from 'clsx';

const METER_DATA = [
    { id: 'M-101', name: 'Inlet A', flow: 1200, pressure: 50.5, temp: 40, timestamp: '10:00:05' },
    { id: 'M-102', name: 'Inlet B', flow: 3400, pressure: 51.2, temp: 42, timestamp: '10:00:05' },
    { id: 'M-201', name: 'Outlet X', flow: 2100, pressure: 30.1, temp: 35, timestamp: '10:00:04' },
    { id: 'M-202', name: 'Outlet Y', flow: 1800, pressure: 29.8, temp: 36, timestamp: '10:00:05' },
];

const columns = [
    { header: 'Meter ID', accessor: 'id' as const },
    { header: 'Meter Name', accessor: 'name' as const },
    { header: 'Flow Rate (m3/h)', accessor: 'flow' as const, className: 'text-right' },
    { header: 'Pressure (bar)', accessor: 'pressure' as const, className: 'text-right' },
    { header: 'Temperature (°C)', accessor: 'temp' as const, className: 'text-right' },
    { header: 'Last Update', accessor: 'timestamp' as const },
];

// Reusable Metric Card
function MetricCard({ label, value, unit, icon: Icon, color }: any) {
    const colorClass = clsx("p-3 rounded-full opacity-10", color);
    const iconClass = clsx("h-6 w-6", color.replace('bg-', 'text-'));

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
                <p className="text-gray-500 text-sm font-medium uppercase">{label}</p>
                <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-bold text-gray-900">{value}</span>
                    <span className="text-sm text-gray-500">{unit}</span>
                </div>
            </div>
            <div className={colorClass}>
                <Icon className={iconClass} />
            </div>
        </div>
    );
}

export default function MeteringPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Telemetry & Metering</h1>
                    <p className="text-gray-500">Live data stream from field instruments.</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-sm font-medium text-green-600">Live Stream Active</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <MetricCard label="Total Plant Flow" value="8,500" unit="m3/h" icon={Gauge} color="bg-blue-600" />
                <MetricCard label="Avg System Pressure" value="50.8" unit="bar" icon={Zap} color="bg-orange-500" />
                <MetricCard label="Gross Calorific Value" value="38.5" unit="MJ/m3" icon={TrendingUp} color="bg-purple-600" />
            </div>

            <DataTable
                title="Meter Readings (Real-time)"
                data={METER_DATA}
                columns={columns}
            />
        </div>
    );
}

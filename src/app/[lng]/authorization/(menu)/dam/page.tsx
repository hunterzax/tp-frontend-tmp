// "use client";
import React from 'react';
import DataTable from '@/components/tables/DataTable';

const DAM_DATA = [
    { id: 'DAM-051', shipper: 'Shipper A', entry: 5000, exit: 4950, ufg: 50, diff: '1.0%' },
    { id: 'DAM-052', shipper: 'Shipper B', entry: 3200, exit: 3220, ufg: -20, diff: '-0.6%' },
    { id: 'DAM-053', shipper: 'Shipper C', entry: 8000, exit: 8000, ufg: 0, diff: '0.0%' },
];

const columns = [
    { header: 'Allocation ID', accessor: 'id' as const },
    { header: 'Shipper Name', accessor: 'shipper' as const },
    { header: 'Entry Energy', accessor: 'entry' as const, className: 'text-right' },
    { header: 'Exit Energy', accessor: 'exit' as const, className: 'text-right' },
    { header: 'UFG (Unaccounted Gas)', accessor: 'ufg' as const, className: 'text-right' },
    {
        header: '% Diff', accessor: (row: typeof DAM_DATA[0]) => (
            <span className={row.ufg > 0 ? 'text-red-500' : row.ufg < 0 ? 'text-blue-500' : 'text-gray-500'}>
                {row.diff}
            </span>
        ), className: 'text-right'
    },
];

export default function DAMPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">DAM (Daily Allocation)</h1>
                    <p className="text-gray-500">Daily verification and reconciliation of gas energy.</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-4">Summary Verification (Gas Day: 2023-11-20)</h3>
                <div className="grid grid-cols-4 gap-4 text-center divide-x divide-gray-100">
                    <div>
                        <p className="text-xs text-gray-500 uppercase">Total System Entry</p>
                        <p className="text-xl font-bold text-gray-800">16,200</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase">Total System Exit</p>
                        <p className="text-xl font-bold text-gray-800">16,170</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase">Net UFG</p>
                        <p className="text-xl font-bold text-red-500">+30</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase">Status</p>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded text-xs bg-yellow-100 text-yellow-800 font-medium">Provisional</span>
                    </div>
                </div>
            </div>

            <DataTable
                title="Shipper Allocation Matrix"
                data={DAM_DATA}
                columns={columns}
            />
        </div>
    );
}

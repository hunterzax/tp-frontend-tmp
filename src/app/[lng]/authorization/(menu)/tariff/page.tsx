'use client';
import React from 'react';
import DataTable from '@/components/tables/DataTable';
import { BadgeDollarSign } from 'lucide-react';

const TARIFF_DATA = [
    { id: 'TRF-F-23', name: 'Firm Capacity Service', unit: 'THB/MMBTU', rate: 45.20, effective: '2023-01-01' },
    { id: 'TRF-I-23', name: 'Interruptible Service', unit: 'THB/MMBTU', rate: 38.50, effective: '2023-01-01' },
    { id: 'TRF-O-23', name: 'Overrun Penalty', unit: 'multiplier', rate: 1.5, effective: '2023-01-01' },
];

const columns = [
    { header: 'Tariff Code', accessor: 'id' as const },
    { header: 'Description', accessor: 'name' as const },
    { header: 'Unit', accessor: 'unit' as const },
    {
        header: 'Rate', accessor: (row: typeof TARIFF_DATA[0]) => (
            <span className="font-bold text-gray-800">{row.rate}</span>
        ), className: 'text-right'
    },
    { header: 'Effective Date', accessor: 'effective' as const },
];

export default function TariffPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Tariff & Pricing</h1>
                    <p className="text-gray-500">Current network access charges and billing rules.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg p-6 text-white text-center">
                    <BadgeDollarSign className="h-12 w-12 mx-auto mb-2 opacity-80" />
                    <h3 className="text-lg font-semibold">Current Network Rate</h3>
                    <p className="text-4xl font-bold my-2">45.20 <span className="text-lg font-normal">THB</span></p>
                    <p className="text-sm opacity-90">Per MMBTU (Firm)</p>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm flex items-center justify-center">
                    <div className="text-center">
                        <h3 className="text-gray-500 font-medium">Next Rate Adjustment</h3>
                        <p className="text-xl font-bold text-gray-800 mt-2">1 Jan 2024</p>
                        <p className="text-sm text-gray-400">Regulatory Reset</p>
                    </div>
                </div>
            </div>

            <DataTable
                title="Applicable Tariffs"
                data={TARIFF_DATA}
                columns={columns}
            />
        </div>
    );
}

"use client";
import React from 'react';
import DataTable from '@/components/tables/DataTable';
import { Calendar as CalendarIcon, FileText } from 'lucide-react';

const NOMINATION_DATA = [
    { id: 'NOM-001', gasDay: '2023-11-20', cycle: 'D-1 (Timely)', quantity: 24000, submittedAt: '2023-11-19 13:00' },
    { id: 'NOM-002', gasDay: '2023-11-20', cycle: 'ID-1 (Intraday 1)', quantity: 24500, submittedAt: '2023-11-19 17:00' },
    { id: 'NOM-003', gasDay: '2023-11-21', cycle: 'D-1 (Timely)', quantity: 23000, submittedAt: '2023-11-20 13:00' },
];

const columns = [
    { header: 'ID', accessor: 'id' as const },
    { header: 'Gas Day', accessor: 'gasDay' as const },
    { header: 'Cycle', accessor: 'cycle' as const },
    { header: 'Nominated Qty', accessor: 'quantity' as const, className: 'text-right font-mono' },
    { header: 'Submitted At', accessor: 'submittedAt' as const },
    {
        header: 'Actions', accessor: () => (
            <button className="text-blue-600 hover:text-blue-800 text-xs font-semibold">View Detail</button>
        )
    },
];

export default function NominationsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Nominations</h1>
                    <p className="text-gray-500">Submit and track gas nominations for upcoming cycles.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Nomination Form Mock */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-500" />
                        Quick Nomination
                    </h2>
                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Gas Day</label>
                                <input type="date" className="w-full text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 p-2 border" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cycle</label>
                                <select className="w-full text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 p-2 border">
                                    <option>Timely (13:00)</option>
                                    <option>Evening (18:00)</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity (MMBTU)</label>
                            <input type="number" placeholder="Enter amount..." className="w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors">
                            Submit Nomination
                        </button>
                    </form>
                </div>

                {/* Status Panel */}
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 flex flex-col justify-center">
                    <h3 className="text-blue-800 font-semibold mb-2">Current Cycle Info</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Active Gas Day:</span>
                            <span className="font-medium text-gray-900">20 Nov 2023</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Next Deadline:</span>
                            <span className="font-medium text-red-600">18:00 (Evening)</span>
                        </div>
                        <div className="mt-4 pt-4 border-t border-blue-200">
                            <div className="text-xs text-blue-600">
                                Tip: Nominations must be submitted 15 minutes before the deadline for processing.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <DataTable
                title="Recent Nominations"
                data={NOMINATION_DATA}
                columns={columns}
            />
        </div>
    );
}

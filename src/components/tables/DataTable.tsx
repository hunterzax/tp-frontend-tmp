'use client';
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpDown, Search } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface Column<T> {
    header: string;
    accessor: keyof T | ((row: T) => React.ReactNode);
    className?: string;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    title?: string;
    searchable?: boolean;
}

// Utility for merging tailwind classes
function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

export default function DataTable<T extends { id: string | number }>({
    data,
    columns,
    title,
    searchable = true,
}: DataTableProps<T>) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const pageSize = 5;

    // Search Logic
    const filteredData = data.filter((row) =>
        Object.values(row as any).some(
            (val) => String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Pagination Logic
    const totalPages = Math.ceil(filteredData.length / pageSize);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            {/* Header / Toolbar */}
            <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {title && <h2 className="text-lg font-semibold text-gray-800">{title}</h2>}

                {searchable && (
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full sm:w-64"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1); // Reset page on search
                            }}
                        />
                    </div>
                )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                        <tr>
                            {columns.map((col, idx) => (
                                <th key={idx} className={cn("px-6 py-3 font-medium", col.className)}>
                                    <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                                        {col.header}
                                        <ArrowUpDown className="h-3 w-3" />
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((row) => (
                                <tr key={row.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                                    {columns.map((col, idx) => (
                                        <td key={idx} className={cn("px-6 py-4 text-gray-700", col.className)}>
                                            {typeof col.accessor === 'function'
                                                ? col.accessor(row)
                                                : (row[col.accessor] as React.ReactNode)}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-500">
                                    No results found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-500">
                    Showing {Math.min((currentPage - 1) * pageSize + 1, filteredData.length)} to {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} entries
                </span>
                <div className="flex gap-1">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft className="h-4 w-4 text-gray-600" />
                    </button>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={cn(
                                    "w-8 h-8 flex items-center justify-center rounded text-xs transition-colors",
                                    currentPage === i + 1
                                        ? "bg-blue-600 text-white font-medium"
                                        : "text-gray-600 hover:bg-gray-100"
                                )}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronRight className="h-4 w-4 text-gray-600" />
                    </button>
                </div>
            </div>
        </div>
    );
}

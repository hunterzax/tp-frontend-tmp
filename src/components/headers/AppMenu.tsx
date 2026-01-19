// coverity[no_effect]
// "use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, BarChart, Calendar, Settings, FileText, Zap, PieChart } from 'lucide-react';
import { clsx } from 'clsx';
import { usePathname } from 'next/navigation';

export default function AppMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    // Helper to get current locale from path
    const lng = pathname.split('/')[1] || 'en';

    const menuItems = [
        { label: 'Dashboard', path: 'dashboardandreport', icon: PieChart },
        { label: 'Allocation', path: 'allocation', icon: BarChart },
        { label: 'Balancing', path: 'balancing', icon: Zap },
        { label: 'Nominations', path: 'nominations', icon: FileText },
        { label: 'Planning', path: 'planning', icon: Calendar },
        { label: 'Settings', path: 'profile', icon: Settings },
    ];

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 -ml-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
                <Menu className="h-6 w-6 text-gray-600" />
            </button>

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Drawer */}
            <div className={clsx(
                "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
                    <span className="text-xl font-bold text-gray-800">Menu</span>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-1 rounded hover:bg-gray-100"
                    >
                        <X className="h-6 w-6 text-gray-500" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto py-4">
                    <nav className="px-2 space-y-1">
                        {menuItems.map((item) => {
                            const href = `/${lng}/authorization/${item.path}`;
                            const isActive = pathname.includes(item.path);
                            return (
                                <Link
                                    key={item.path}
                                    href={href}
                                    onClick={() => setIsOpen(false)}
                                    className={clsx(
                                        "group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors",
                                        isActive
                                            ? "bg-blue-50 text-blue-600"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    )}
                                >
                                    <item.icon
                                        className={clsx(
                                            "mr-4 h-5 w-5 flex-shrink-0",
                                            isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-500"
                                        )}
                                    />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="border-t border-gray-200 p-4">
                    <div className="flex items-center">
                        <div className="bg-blue-500 rounded-full h-8 w-8 flex items-center justify-center text-white font-bold">
                            U
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700">User Account</p>
                            <p className="text-xs text-gray-500">View Profile</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

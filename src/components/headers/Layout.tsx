'use client';
import React from 'react';
import Link from 'next/link';
import AppMenu from './AppMenu'; // Enhanced Menu
import BreadcrumbsMenu from './BreadcrumbsMenu';
import { Bell, User, Clock, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            sessionStorage.clear();
            document.cookie = 'v4r2d9z5m3h0c1p0x7l=; Max-Age=0; path=/;';
            router.push('/signin');
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm z-30 border-b border-gray-200 sticky top-0">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    {/* Left: Logo & Menu */}
                    <div className="flex items-center gap-4">
                        <AppMenu />
                        <Link href="/authorization" className="flex items-center gap-2">
                            <div className="h-8 w-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-lg">E</div>
                            <span className="text-xl font-bold text-gray-800 tracking-tight">EnterpriseApp</span>
                        </Link>
                    </div>

                    {/* Right: User Tools */}
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-2 text-gray-500 text-sm bg-gray-50 px-3 py-1 rounded-full">
                            <Clock className="h-4 w-4" />
                            <span>15:30 UTC</span>
                        </div>

                        <button className="relative p-1 text-gray-600 hover:text-blue-600 transition">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>

                        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                            <div className="bg-gray-100 rounded-full h-8 w-8 flex items-center justify-center text-gray-600">
                                <User className="h-4 w-4" />
                            </div>
                            <div className="hidden md:block">
                                <p className="text-sm font-medium text-gray-700 leading-none">Admin User</p>
                                <button
                                    onClick={handleLogout}
                                    className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 mt-1 font-medium"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sub-Header: Breadcrumbs */}
                <div className="bg-gray-50 border-b border-gray-200">
                    <div className="container mx-auto px-4 py-2">
                        <BreadcrumbsMenu />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl animate-fade-in">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
                    <p>© 2026 Enterprise Corp. All rights reserved.</p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-blue-600">Privacy Policy</a>
                        <a href="#" className="hover:text-blue-600">Terms of Service</a>
                        <a href="#" className="hover:text-blue-600">Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

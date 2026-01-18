'use client';
import React from 'react';
import Link from 'next/link';

// Placeholder sub-components to satisfy imports
const Profile = () => <div className="p-2 border rounded">Profile Payload</div>;
const AppMenu = () => <div className="p-2">Menu</div>;
const BreadcrumbsMenu = () => <div className="p-2">Breadcrumbs</div>;
const NotificationArea = () => <div className="p-2">🔔</div>;
const TimeCount = () => <div className="text-sm">12:00 PM</div>;

export default function Layout({ children }: { children: React.ReactNode }) {

    const handleLogout = () => {
        // Clear storage logic
        if (typeof window !== 'undefined') {
            sessionStorage.clear();
            document.cookie = 'v4r2d9z5m3h0c1p0x7l=; Max-Age=0; path=/;';
            window.location.href = '/signin';
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-md z-10">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    {/* Left: Logo & Menu */}
                    <div className="flex items-center gap-4">
                        <AppMenu />
                        <Link href="/authorization" className="text-xl font-bold text-blue-600">
                            Enterprise App
                        </Link>
                    </div>

                    {/* Right: User Tools */}
                    <div className="flex items-center gap-4">
                        <TimeCount />
                        <NotificationArea />
                        <Profile />
                        <button
                            onClick={handleLogout}
                            className="text-sm text-red-600 hover:text-red-800 font-medium"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Sub-Header: Breadcrumbs */}
                <div className="border-t">
                    <div className="container mx-auto px-4 py-2">
                        <BreadcrumbsMenu />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 container mx-auto px-4 py-8">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-4 text-center text-sm">
                © 2026 Enterprise Corp. All rights reserved.
            </footer>
        </div>
    );
}

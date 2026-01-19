// coverity[no_effect]
// "use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getService } from '@/utils/postService';

// Interfaces
interface MenuItem {
    id: string;
    label: string;
    path: string;
    icon: string; // Emoji or Icon name 
}

export default function DashboardPage({ params }: { params: { lng: string } }) {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch dynamic menu from API or Mock
        const fetchMenu = async () => {
            try {
                // In a real app: await getService('/api/auth/permissions');
                // Mocking response for scaffolding
                setMenuItems([
                    { id: '1', label: 'Allocation', path: 'allocation', icon: '📊' },
                    { id: '2', label: 'Balancing', path: 'balancing', icon: '⚖️' },
                    { id: '3', label: 'Booking', path: 'booking', icon: '📅' },
                    { id: '4', label: 'DAM', path: 'dam', icon: '💿' },
                    { id: '5', label: 'Reports', path: 'dashboardandreport', icon: '📈' },
                    { id: '6', label: 'Events', path: 'event', icon: '🔔' },
                    { id: '7', label: 'Metering', path: 'metering', icon: '⚡' },
                    { id: '8', label: 'Nominations', path: 'nominations', icon: '📝' },
                    { id: '9', label: 'Planning', path: 'planning', icon: '🗓️' },
                    { id: '10', label: 'Tariff', path: 'tariff', icon: '💲' },
                ]);
            } catch (error) {
                console.error('Failed to load menu', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMenu();
    }, []);

    if (loading) return <div className="p-8 text-center">Loading Dashboard...</div>;

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">Welcome to Dashboard</h1>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {menuItems.map((item) => (
                    <Link
                        key={item.id}
                        href={`/${params.lng}/authorization/${item.path}`}
                        className="block group"
                    >
                        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border border-gray-100 flex flex-col items-center justify-center text-center h-40">
                            <span className="text-4xl mb-3 group-hover:scale-110 transition duration-300">
                                {item.icon}
                            </span>
                            <span className="font-semibold text-gray-700 group-hover:text-blue-600">
                                {item.label}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Footer Announcement Marquee */}
            <div className="fixed bottom-0 left-0 right-0 bg-blue-900 text-white py-2 overflow-hidden z-20">
                <div className="animate-marquee whitespace-nowrap">
                    📢 System Maintenance scheduled for Sunday 22:00 - 00:00 UTC. Please save your work.
                </div>
            </div>

            <style jsx>{`
                .animate-marquee {
                    animation: marquee 20s linear infinite;
                    display: inline-block;
                    padding-left: 100%;
                }
                @keyframes marquee {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(-100%, 0); }
                }
            `}</style>
        </div>
    );
}

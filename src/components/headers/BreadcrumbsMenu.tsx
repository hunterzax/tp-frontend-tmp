'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export default function BreadcrumbsMenu() {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean).slice(1); // skip locale at index 0 generally or assuming slice 1 if layout not rigid

    // Clean up segments for display
    // e.g., ['en', 'authorization', 'allocation'] -> Home > Authorization > Allocation

    // Quick Fix: Remove locale from segments if it's the first one
    const localePattern = /^(en|th)$/;
    const cleanSegments = segments.filter(s => !localePattern.test(s));

    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                    <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                        <Home className="w-4 h-4 mr-2" />
                        Home
                    </Link>
                </li>
                {cleanSegments.map((segment, index) => {
                    // Reconstruct path logic needs to be robust, simplified here
                    // Assuming structure is always /[lng]/[...segments]
                    const segmentPathIndex = segments.indexOf(segment);
                    const href = '/' + segments.slice(0, segmentPathIndex + 1).join('/');
                    const isLast = index === cleanSegments.length - 1;

                    return (
                        <li key={segment}>
                            <div className="flex items-center">
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                                <Link
                                    href={isLast ? '#' : href}
                                    className={`ml-1 text-sm font-medium md:ml-2 ${isLast
                                            ? 'text-gray-500 cursor-default'
                                            : 'text-gray-700 hover:text-blue-600'
                                        }`}
                                >
                                    {segment.charAt(0).toUpperCase() + segment.slice(1)}
                                </Link>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

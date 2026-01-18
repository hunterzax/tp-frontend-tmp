import React from 'react';

interface ModulePageProps {
    title: string;
    description: string;
}

export default function ModulePlaceholder({ title, description }: ModulePageProps) {
    return (
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 max-w-4xl mx-auto mt-10 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
            <p className="text-gray-600 text-lg mb-8">{description}</p>
            <div className="p-4 bg-blue-50 text-blue-800 rounded inline-block">
                🚧 Module Under Construction
            </div>
        </div>
    );
}

// "use client";
import React from 'react';
import { User, Mail, Shield, Save } from 'lucide-react';

export default function ProfilePage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
                    <p className="text-gray-500">Manage account preferences and security settings.</p>
                </div>
            </div>

            <div className="flex gap-8 flex-col md:flex-row">
                {/* Sidebar Card */}
                <div className="w-full md:w-1/3 space-y-6">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center">
                        <div className="h-24 w-24 bg-blue-100 rounded-full mx-auto flex items-center justify-center text-blue-600 mb-4">
                            <User className="h-12 w-12" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">John Doe</h2>
                        <p className="text-sm text-gray-500">Shipper Admin</p>

                        <div className="mt-6 flex justify-center">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Active
                            </span>
                        </div>
                    </div>
                </div>

                {/* Form Area */}
                <div className="w-full md:w-2/3">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 border-b pb-4 mb-6">Personal Information</h3>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input type="text" defaultValue="John" className="pl-10 w-full border border-gray-300 rounded-md p-2 text-sm" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input type="text" defaultValue="Doe" className="pl-10 w-full border border-gray-300 rounded-md p-2 text-sm" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input type="email" defaultValue="admin@shipper-a.com" disabled className="pl-10 w-full border border-gray-300 bg-gray-50 rounded-md p-2 text-sm" />
                                </div>
                                <p className="mt-1 text-xs text-gray-400">Email cannot be changed contact support.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role & Permissions</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Shield className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input type="text" defaultValue="Shipper Administrator (Read/Write)" disabled className="pl-10 w-full border border-gray-300 bg-gray-50 rounded-md p-2 text-sm" />
                                </div>
                            </div>

                            <div className="pt-4 border-t flex justify-end">
                                <button type="button" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                                    <Save className="h-4 w-4" /> Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React from 'react';
import Layout from '@/components/headers/Layout';

export default function AuthorizationLayout({ children }: { children: React.ReactNode }) {
    return (
        <Layout>
            {children}
        </Layout>
    );
}

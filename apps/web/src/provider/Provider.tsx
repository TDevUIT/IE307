'use client';

import Sidebar from '@/components/Sidebar';
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';

interface ProviderProps {
    children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
    const pathname = usePathname();
    const isAdminPath = useMemo(() => {
        const langSegment = pathname.split('/')[1];
        return pathname === `/${langSegment}/admin`;
    }, [pathname]);

    return (
        <>
            {!isAdminPath ? 
                <div className="flex min-h-screen">
                    <Sidebar />
                    <main className="flex-grow p-4 sm:p-6 md:p-8">
                        {children}
                    </main>
                </div>
                :
                <div>
                    {children}
                </div>
            }
        </>
        
    );
};

export default Provider;

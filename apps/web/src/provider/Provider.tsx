'use client';
import dynamic from 'next/dynamic';
import Loading from '@/components/Loading';
import Sidebar from '@/components/Sidebar';
import { usePathname } from 'next/navigation';
import React, { useMemo, useState, useEffect, Suspense } from 'react';

interface ProviderProps {
    children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
    const pathname = usePathname();
    const [delayed, setDelayed] = useState(true);

    const isAdminPath = useMemo(() => {
        if (!pathname) return false;  
        const langSegment = pathname.split('/')[1];
        return pathname === `/${langSegment}/admin`;
    }, [pathname]);

    useEffect(() => {
        const timeoutId = setTimeout(() => setDelayed(false), 1000);
        return () => clearTimeout(timeoutId);
    }, [pathname]);

    if (delayed) {
        return <Loading />;
    }

    return (
        <Suspense fallback={<Loading />}>
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
        </Suspense>
    );
};

export default dynamic(() => Promise.resolve(Provider), { ssr: false });

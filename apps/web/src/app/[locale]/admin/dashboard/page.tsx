'use client'
import { useAuth } from '@/context/AuthContext';
import { useHandleTranslations } from '@/lib/handleTranslations'
import React from 'react'

const AdminPage = () => {
    const t = useHandleTranslations("Homepage");
    const {profile} = useAuth();
    console.log(
        profile
    )
    return (
        <div className=''>
            <p>AdminPage</p>
            <p>{profile?.name}</p>
            <p>{t.title}</p>
        </div>
        
    )
}

export default AdminPage

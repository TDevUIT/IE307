import { useHandleTranslations } from '@/lib/handleTranslations'
import React from 'react'

const AdminPage = () => {
    const t = useHandleTranslations("Homepage");
    return (
        <div className=''>
            <p>AdminPage</p>
            <p>{t.title}</p>
        </div>
        
    )
}

export default AdminPage

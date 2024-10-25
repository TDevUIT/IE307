import Sidebar from '@/components/Sidebar'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <div className='flex'>
        <Sidebar />
        <div className='p-2'>
          {children}
        </div>
      </div>
    </NextIntlClientProvider>
  )
}

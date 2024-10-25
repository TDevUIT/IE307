import { SidebarProvider } from '@/context/SidebarContext'
import Provider from '@/provider/Provider'
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
      <SidebarProvider>
        <Provider>
          {children}
        </Provider>  
      </SidebarProvider>
      </NextIntlClientProvider>
    
  )
}

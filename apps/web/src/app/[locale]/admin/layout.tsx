import { AuthProvider } from '@/context/AuthContext';
import { SidebarProvider } from '@/context/SidebarContext';
import Provider from '@/provider/Provider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { cookies } from 'next/headers';
import { ReactNode } from 'react'; 

export default async function RootLayout({
  children,
}: {
  children: ReactNode; 
}) {
  const messages = await getMessages();
  const CookieStore = await cookies();
  const accessToken = CookieStore.get('access_token');

  return (
    <NextIntlClientProvider messages={messages}>
      <AuthProvider initialAccessToken={accessToken?.value}>
        <SidebarProvider>
          <Provider>
            {children}
          </Provider>
        </SidebarProvider>
      </AuthProvider>
    </NextIntlClientProvider>
  );
}

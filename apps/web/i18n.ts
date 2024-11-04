/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

// Define your supported locales
export const locales = ['en', 'vi', 'jp'];

export default getRequestConfig(async () => {
  // Await headers and then retrieve the locale
  const requestHeaders = await headers();
  const localeHeader = requestHeaders.get('X-NEXT-INTL-LOCALE') as string;
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(localeHeader)) notFound();

  // Return the proper locale messages
  try {
    return {
      messages: (await import(`./src/messages/${localeHeader}.json`)).default
    };
  } catch (error) {
    notFound(); // Handle missing locale messages
  }
});

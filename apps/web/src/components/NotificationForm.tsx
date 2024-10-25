'use client';
import { useHandleTranslations } from '@/lib/handleTranslations';
import React, { useState } from 'react';

interface NotificationFormProps {
  onSubscribe: (email: string) => Promise<void>;
}

const NotificationForm: React.FC<NotificationFormProps> = ({ onSubscribe }) => {
    const [email, setEmail] = useState<string>('');
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const t = useHandleTranslations("Notifications");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email) {
        setIsLoading(true);
        try {
            await onSubscribe(email);
            setIsSubmitted(true);
            setEmail('');
            setError(null);
        } catch (err) {
            setError(t.error); 
        } finally {
            setIsLoading(false);
        }
        }
    };

    return (
        <div className="flex flex-col items-center p-6 mb-10">
        <h2 className="text-orange-600 font-semibold text-xl mb-4">
            {t.title}
        </h2>
        <p className="text-gray-700 mb-4 text-center">
            {t.description}
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md gap-4 sm:flex-row">
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.placeholder}
            required
            aria-label="Email for product updates"
            className="flex-grow p-2 rounded-lg border border-orange-400 focus:outline-none focus:border-orange-500 transition-colors sm:rounded-l-lg"
            />
            <button
            type="submit"
            disabled={isLoading}
            className={`bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors sm:rounded-r-lg ${isLoading && 'opacity-70'}`}
            >
            {isLoading ? t.subscribing : t.subscribe} 
            </button>
        </form>
        {isSubmitted && !error && (
            <p className="text-green-600 mt-4">{t.thankYou}</p> 
        )}
        {error && <p className="text-red-600 mt-4">{error}</p>}
        </div>
    );
};

export default NotificationForm;

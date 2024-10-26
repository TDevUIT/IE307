'use client';
import { setCookieToken } from '@/actions/Cookie';
import axiosInstance from '@/app/helper/axios';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const langSegment = pathname.split('/')[1];
  console.log(pathname,langSegment);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await axiosInstance.post('/auth/sign-in', {
        email,
        password,
      });
      console.log(response);
      if (response.data) {
        await setCookieToken(response.data.data.access_token);
        router.push(`/${langSegment}/admin/dashboard`);
      }
    } catch (error) {
        setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-xl rounded-xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-800">Admin Login</h2>
        <p className="text-center text-gray-500">Enter your credentials to access the admin dashboard</p>

        {errorMessage && (
          <div className="px-4 py-2 text-sm text-red-600 bg-red-100 border border-red-300 rounded-lg">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className={`w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Back to{' '}
          <a href="/" className="text-blue-600 hover:underline">
            Home
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminLoginPage;

'use client'
import React from 'react'
import UserOverview from './_components/UserOverview'
import SummaryCard from './_components/SummaryCard'
import CourseProgressCard from './_components/CourseProgressCard'
import FlashcardReviewCard from './_components/FlashcardReviewCard'
import RecentActivityFeed from './_components/RecentActivityFeed'
import { FaUsers, FaUserPlus, FaChartLine } from 'react-icons/fa'
import CourcesActivityFeed from './_components/CourcesActivityFeed'

const HomeDashboard: React.FC = () => {
  return (
    <div className="p-8 min-h-screen text-gray-800">
        <div className="mb-8 flex items-center justify-between">
            <h1 className="text-4xl font-bold text-gray-900">Welcome Back, User!</h1>
            <span className="text-gray-500 text-md">{new Date().toLocaleDateString()}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <SummaryCard icon={<FaUsers />} title="Total Users" count={2400} bgColor="bg-blue-200 hover:bg-blue-300 shadow-md rounded-lg" />
            <SummaryCard icon={<FaChartLine />} title="Active Users" count={1900} bgColor="bg-green-200 hover:bg-green-300 shadow-md rounded-lg" />
            <SummaryCard icon={<FaUserPlus />} title="New Users This Month" count={150} bgColor="bg-yellow-200 hover:bg-yellow-300 shadow-md rounded-lg" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CourseProgressCard />
            <FlashcardReviewCard />
        </div>

        <div className="mt-10 pt-8">
            <div className="p-8">
                <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">User Overview</h2>
                <p className="text-gray-500 mt-1">
                    Track monthly active user growth and engagement levels over time.
                </p>
                </div>

                <div className="flex justify-between mb-6">
                <div className="text-center">
                    <p className="text-lg font-semibold text-blue-600">+15%</p>
                    <p className="text-sm text-gray-500">Growth this month</p>
                </div>
                <div className="text-center">
                    <p className="text-lg font-semibold text-green-600">700</p>
                    <p className="text-sm text-gray-500">Peak active users</p>
                </div>
                <div className="text-center">
                    <p className="text-lg font-semibold text-yellow-600">5.2 hrs</p>
                    <p className="text-sm text-gray-500">Avg time spent</p>
                </div>
                </div>

                <div className="flex flex-row gap-6 justify-between">
                <div className="w-1/2">
                    <UserOverview />
                </div>
                <div className="w-1/2">
                    <UserOverview />
                </div>
                </div>

                <div className="mt-4 flex justify-end">
                <button className="text-gray-600 bg-gray-100 py-1 px-4 rounded-md hover:bg-gray-200">
                    Last 6 months
                </button>
                <button className="text-gray-600 bg-gray-100 py-1 px-4 ml-2 rounded-md hover:bg-gray-200">
                    Last year
                </button>
                </div>
            </div>
            </div>



        <div className="mt-8 border-t border-gray-300 pt-8 flex gap-x-4">
            <RecentActivityFeed />
            <CourcesActivityFeed />
            <RecentActivityFeed />
        </div>
    </div>
  )
}

export default HomeDashboard

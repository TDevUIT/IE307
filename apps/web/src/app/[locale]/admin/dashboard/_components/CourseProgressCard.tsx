import React from 'react'
import { Bar } from 'react-chartjs-2'
import { FaBookOpen } from 'react-icons/fa'
import 'chart.js/auto'

const CourseProgressCard: React.FC = () => {
  const data = {
    labels: ['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4'],
    datasets: [
      {
        label: 'Completion Rate',
        data: [85, 90, 60, 70],
        backgroundColor: 'rgba(99, 123, 255, 0.85)',
        borderRadius: 5,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
      <div className="flex items-center mb-4">
        <FaBookOpen className="text-blue-500 mr-2 text-2xl" />
        <h3 className="text-gray-700 font-semibold text-lg">Course Progress</h3>
      </div>
      <div className="h-40">
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}

export default CourseProgressCard

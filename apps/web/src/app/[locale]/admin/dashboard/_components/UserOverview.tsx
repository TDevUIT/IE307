import React from 'react'
import { Bar } from 'react-chartjs-2'
import 'chart.js/auto'

const UserOverview: React.FC = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Active Users',
        data: [400, 300, 500, 200, 600, 700],
        backgroundColor: 'rgba(99, 123, 255, 0.85)',
        borderRadius: 8,
        barPercentage: 0.6,
        hoverBackgroundColor: 'rgba(99, 123, 255, 1)',
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#333',
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#4A5568', font: { size: 12 } },
      },
      y: {
        grid: { color: 'rgba(234, 236, 239, 0.3)' },
        ticks: { color: '#4A5568', font: { size: 12 } },
      },
    },
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out">
      <h3 className="text-xl text-gray-700 font-semibold mb-4">User Engagement</h3>
      <div className="h-60">
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}

export default UserOverview

import React from 'react'
import { FaUserCircle } from 'react-icons/fa'

const activities = [
  { id: 1, activity: 'Completed Lesson 5', user: 'John Doe' },
  { id: 2, activity: 'Reviewed vocabulary', user: 'Jane Smith' },
  { id: 3, activity: 'Started Lesson 3', user: 'Alex Kim' },
]

const CourcesActivityFeed: React.FC = () => (
  <div className="bg-gradient-to-br from-white to-gray-100 p-6 rounded-lg shadow-lg w-full max-w-md">
    <h3 className="text-gray-600 font-semibold mb-6 text-lg tracking-wide">Cources Activity</h3>
    <ul>
      {activities.map((activity) => (
        <li
          key={activity.id}
          className="flex items-center space-x-4 p-3 rounded-md transition transform hover:bg-gray-50 hover:scale-105"
        >
          <FaUserCircle className="text-gray-400 text-3xl" />
          <div>
            <p className="text-gray-800">
              <span className="font-semibold text-gray-700">{activity.user}</span> {activity.activity}
            </p>
          </div>
        </li>
      ))}
    </ul>
  </div>
)

export default CourcesActivityFeed

import React from 'react'
import { FaClipboardList } from 'react-icons/fa'

const FlashcardReviewCard: React.FC = () => (
  <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
    <div className="flex items-center mb-4">
      <FaClipboardList className="text-green-500 mr-2 text-2xl" />
      <h3 className="text-gray-700 font-semibold text-lg">Vocabulary & Flashcard Reviews</h3>
    </div>
    <div className="mt-2">
      <p className="text-lg font-semibold text-gray-800">
        Reviews Completed: <span className="text-green-600">120</span>
      </p>
      <p className="text-lg font-semibold text-gray-800 mt-2">
        Reviews Pending: <span className="text-yellow-500">30</span>
      </p>
    </div>
  </div>
)

export default FlashcardReviewCard

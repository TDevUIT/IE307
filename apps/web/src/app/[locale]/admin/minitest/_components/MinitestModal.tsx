import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MiniTest, Lesson } from '@/app/types/types';

interface MinitestModalProps {
  minitest?: MiniTest | null;
  lessons: Lesson[];
  onClose: () => void;
  onSave: (data: { question: string; answer: string; lessonId: string }) => Promise<void>;
}

const MinitestModal: React.FC<MinitestModalProps> = ({ minitest, lessons, onClose, onSave }) => {
  const [question, setQuestion] = useState(minitest?.question || '');
  const [answer, setAnswer] = useState(minitest?.answer || '');
  const [lessonId, setLessonId] = useState(minitest?.lessonId || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    await onSave({ question, answer, lessonId });
    setLoading(false);
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4"
      >
        <h2 className="text-xl font-semibold mb-6">{minitest ? 'Edit Minitest' : 'Add Minitest'}</h2>
        <form onSubmit={handleSave}>
          <label className="block mb-4">
            Question:
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mt-1"
              placeholder="Enter minitest question"
              disabled={loading}
            />
          </label>
          <label className="block mb-4">
            Answer (URL or Text):
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mt-1"
              placeholder="Enter minitest answer"
              disabled={loading}
            />
          </label>
          <label className="block mb-4">
            Select Lesson:
            <select
              value={lessonId}
              onChange={(e) => setLessonId(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mt-1"
              disabled={loading}
            >
              <option value="">Select a lesson</option>
              {lessons.map((lesson) => (
                <option key={lesson.id} value={lesson.id}>
                  {lesson.title}
                </option>
              ))}
            </select>
          </label>
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors duration-200"
              disabled={loading}
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors duration-200"
              disabled={loading || !question || !answer || !lessonId}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default MinitestModal;

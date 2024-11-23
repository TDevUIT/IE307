import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GrammarModalProps {
  grammar?: {
    id?: string;
    rule: string;
    description: string;
    lessonId?: string;
  } | null;
  lessons: { id: string; title: string }[]; 
  onClose: () => void;
  onSave: (data: { rule: string; description: string; lessonId: string }) => Promise<void>;
}

const GrammarModal: React.FC<GrammarModalProps> = ({ grammar, lessons, onClose, onSave }) => {
  const [rule, setRule] = useState(grammar?.rule || '');
  const [description, setDescription] = useState(grammar?.description || '');
  const [lessonId, setLessonId] = useState(grammar?.lessonId || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    await onSave({ rule, description, lessonId });
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
        <h2 className="text-xl font-semibold mb-6">{grammar ? 'Edit Grammar' : 'Add Grammar'}</h2>
        <form onSubmit={handleSave}>
          <label className="block mb-4">
            Rule:
            <input
              type="text"
              value={rule}
              onChange={(e) => setRule(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mt-1"
              placeholder="Enter grammar rule"
              disabled={loading}
            />
          </label>
          <label className="block mb-4">
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mt-1"
              placeholder="Enter description"
              disabled={loading}
            />
          </label>
          <label className="block mb-4">
            Lesson:
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
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 mr-4 hover:text-gray-700 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-md transition-colors duration-200"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default GrammarModal;

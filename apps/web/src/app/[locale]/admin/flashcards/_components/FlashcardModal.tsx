import React, { useEffect, useState } from 'react';
import { FlashCard, Lesson } from '@/app/types/types';
import { motion } from 'framer-motion';

interface FlashcardModalProps {
  flashcard?: FlashCard | null;
  lessons: Lesson[];
  onClose: () => void;
  onSave: (data: { term: string; definition: string; kanji: string; lessonId: string }) => Promise<void>;
}

const FlashcardModal: React.FC<FlashcardModalProps> = ({ flashcard, lessons, onClose, onSave }) => {
  const [term, setTerm] = useState(flashcard?.term || '');
  const [definition, setDefinition] = useState(flashcard?.definition || '');
  const [kanji, setKanji] = useState(flashcard?.kanji || '');
  const [lessonId, setLessonId] = useState(flashcard?.lessonId || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    await onSave({ term, definition, kanji, lessonId });
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
        <h2 className="text-xl font-semibold mb-6">{flashcard ? 'Edit Flashcard' : 'Add Flashcard'}</h2>
        <form onSubmit={handleSave}>
          <label className="block mb-4">
            Term (Japanese):
            <input
              type="text"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mt-1"
              placeholder="Enter Japanese term"
              disabled={loading}
            />
          </label>
          <label className="block mb-4">
            Definition (Vietnamese):
            <input
              type="text"
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mt-1"
              placeholder="Enter definition"
              disabled={loading}
            />
          </label>
          <label className="block mb-4">
            Kanji:
            <input
              type="text"
              value={kanji}
              onChange={(e) => setKanji(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mt-1"
              placeholder="Enter kanji characters"
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

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors duration-200"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
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

export default FlashcardModal;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Select from 'react-select';

interface VocabularyModalProps {
  vocabulary?: { wordJP: string; wordVN: string; kanji: string; lessonId?: string } | null;
  onClose: () => void;
  onSave: (data: { wordJP: string; wordVN: string; kanji: string; lessonId: string }) => Promise<void>;
  lessons: { id: string; title: string }[]; 
}

const VocabularyModal: React.FC<VocabularyModalProps> = ({ vocabulary, onClose, onSave, lessons }) => {
    const [wordJP, setWordJP] = useState(vocabulary?.wordJP || '');
    const [wordVN, setWordVN] = useState(vocabulary?.wordVN || '');
    const [kanji, setKanji] = useState(vocabulary?.kanji || '');
    const [selectedLesson, setSelectedLesson] = useState<{ label: string; value: string } | null>(
      vocabulary
        ? { label: lessons.find((lesson) => lesson.id === vocabulary.lessonId)?.title || '', value: vocabulary.lessonId || '' }
        : null
    );
    const [loading, setLoading] = useState(false);
  
    const handleSave = async (event: React.FormEvent) => {
      event.preventDefault();
      setLoading(true);
      if (selectedLesson) {
        await onSave({
          wordJP,
          wordVN,
          kanji,
          lessonId: selectedLesson.value, 
        });
      }
      setLoading(false);
    };
  
    useEffect(() => {
      const handleEsc = (event: KeyboardEvent) => {
        if (event.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);
  
    const safeLessons = Array.isArray(lessons) ? lessons : [];
  
    const handleOverlayClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };
  
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
        onClick={handleOverlayClick}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">{vocabulary ? 'Edit Vocabulary' : 'Add Vocabulary'}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              disabled={loading}
            >
              &times;
            </button>
          </div>
          <form onSubmit={handleSave}>
            <label className="block mb-4">
              Japanese Word:
              <input
                type="text"
                value={wordJP}
                onChange={(e) => setWordJP(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded mt-1"
                placeholder="Enter Japanese word"
                disabled={loading}
              />
            </label>
            <label className="block mb-4">
              Vietnamese Meaning:
              <input
                type="text"
                value={wordVN}
                onChange={(e) => setWordVN(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded mt-1"
                placeholder="Enter Vietnamese meaning"
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
                placeholder="Enter Kanji characters"
                disabled={loading}
              />
            </label>
            <label className="block mb-2">Lesson</label>
            <Select
              options={safeLessons.map((lesson) => ({
                label: lesson.title,
                value: lesson.id,
              }))}
              value={selectedLesson}
              onChange={setSelectedLesson}
              isSearchable
              placeholder="Search for lesson..."
              isDisabled={loading} 
            />
            <div className="mt-4">
              <button
                type="submit"
                disabled={loading || !selectedLesson}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    );
  };
  

export default VocabularyModal;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CourseModalProps {
  course?: { title: string; description: string } | null;
  onClose: () => void;
  onSave: (data: { title: string; description: string }) => Promise<void>;
}

const CourseModal: React.FC<CourseModalProps> = ({ course, onClose, onSave }) => {
  const [title, setTitle] = useState(course?.title || '');
  const [description, setDescription] = useState(course?.description || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    await onSave({ title, description });
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
        <h2 className="text-xl font-semibold mb-6">{course ? 'Edit Course' : 'Add Course'}</h2>
        <form onSubmit={handleSave}>
          <label className="block mb-4">
            Title:
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className="w-full border border-gray-300 p-2 rounded mt-1"
              placeholder="Enter course title"
              disabled={loading}
            />
          </label>
          <label className="block mb-4">
            Description:
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="w-full border border-gray-300 p-2 rounded mt-1"
              placeholder="Enter course description"
              disabled={loading}
            />
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

export default CourseModal;

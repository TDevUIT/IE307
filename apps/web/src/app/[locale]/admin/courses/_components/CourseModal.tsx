import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CourseModalProps {
  onClose: () => void;
}

const CourseModal: React.FC<CourseModalProps> = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    // Save course logic goes here
    onClose();
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
        <h2 className="text-xl font-semibold mb-6">Add / Edit Course</h2>
        <form onSubmit={handleSave}>
          <label className="block mb-4">
            Title:
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className="w-full border border-gray-300 p-2 rounded mt-1"
              placeholder="Enter course title"
            />
          </label>
          <label className="block mb-4">
            Description:
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="w-full border border-gray-300 p-2 rounded mt-1"
              placeholder="Enter course description"
            />
          </label>
          <div className="flex justify-end mt-6">
            <button 
              type="button" 
              onClick={onClose} 
              className="text-gray-500 mr-4 hover:text-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-md transition-colors duration-200"
            >
              Save
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CourseModal;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
interface LessonModalProps {
  lesson?: {
    id?: string;
    title: string;
    content: string;
    courseId?: string;
  } | null;
  onClose: () => void;
  onSave: (data: { title: string; content: string; courseId?: string }) => Promise<void>;
}

interface LessonModalProps {
    lesson?: {
      id?: string;
      title: string;
      content: string;
      courseId?: string;
    } | null;
    courses: { id: string; title: string }[]; 
    onClose: () => void;
    onSave: (data: { title: string; content: string; courseId?: string }) => Promise<void>;
  }
  
  const LessonModal: React.FC<LessonModalProps> = ({ lesson, courses, onClose, onSave }) => {
    const [title, setTitle] = useState(lesson?.title || '');
    const [content, setContent] = useState(lesson?.content || '');
    const [courseId, setCourseId] = useState(lesson?.courseId || '');
    const [loading, setLoading] = useState(false);
  
    const handleSave = async (event: React.FormEvent) => {
      event.preventDefault();
      setLoading(true);
      await onSave({ title, content, courseId: courseId || undefined });
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
          <h2 className="text-xl font-semibold mb-6">{lesson ? 'Edit Lesson' : 'Add Lesson'}</h2>
          <form onSubmit={handleSave}>
            <label className="block mb-4">
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded mt-1"
                placeholder="Enter lesson title"
                disabled={loading}
              />
            </label>
            <label className="block mb-4">
              Content (Video URL):
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded mt-1"
                placeholder="Enter video URL"
                disabled={loading}
              />
            </label>
            <label className="block mb-4">
              Course:
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded mt-1 bg-white"
                disabled={loading}
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
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
  
  export default LessonModal;
  

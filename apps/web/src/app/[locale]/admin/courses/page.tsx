'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CourseTable from './_components/CourseTable';
import CourseModal from './_components/CourseModal';

const CoursesPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <div className="flex">
      <main className="flex-1 p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold mb-6">Courses Management</h1>
          <button 
            onClick={handleOpenModal} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4 shadow-md transition-colors duration-200"
          >
            Add New Course
          </button>
          <CourseTable onEdit={handleOpenModal} />
        </motion.div>
        
        <AnimatePresence>
          {isModalOpen && (
            <CourseModal onClose={handleCloseModal} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default CoursesPage;

'use client'
import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import CourseTable from './_components/CourseTable';
import CourseModal from './_components/CourseModal';

const CourcesPage: React.FC = () => {
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
          <h1 className="text-xl font-bold mb-4">Courses Management</h1>
          <button onClick={handleOpenModal} className="btn btn-primary mb-4">
            Add New Course
          </button>
          <CourseTable onEdit={handleOpenModal} />
          {isModalOpen && <CourseModal onClose={handleCloseModal} />}
        </motion.div>
      </main>
    </div>
  );
};

export default CourcesPage;

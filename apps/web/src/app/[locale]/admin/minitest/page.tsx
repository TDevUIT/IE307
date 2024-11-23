'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MinitestTable from './_components/MinitestTable';
import MinitestModal from './_components/MinitestModal';
import { Lesson, MiniTest } from '@/app/types/types';
import axiosInstance from '@/app/helper/axios';
import Swal from 'sweetalert2';

const MinitestPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [minitests, setMinitests] = useState<MiniTest[]>([]);
  const [selectedMinitest, setSelectedMinitest] = useState<MiniTest | undefined>(undefined);
  const [lessons, setLessons] = useState<Lesson[]>([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [minitestResponse, lessonsResponse] = await Promise.all([
          axiosInstance.get('/minitest'),
          axiosInstance.get('/lessons/all/names'),
        ]);
        
        setMinitests(minitestResponse.data.data);
        setLessons(lessonsResponse.data.data); 
      } catch (error) {
        console.error('Error fetching minitests and lessons:', error);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = (minitest?: MiniTest) => {
    setSelectedMinitest(minitest);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMinitest(undefined);
  };

  const handleSaveMinitest = async (minitestData: { question: string; answer: string; lessonId: string }) => {
    try {
      if (selectedMinitest) {
        const response = await axiosInstance.put(`/minitest/${selectedMinitest.id}`, minitestData);
        setMinitests((prevMinitests) =>
          prevMinitests.map((minitest) =>
            minitest.id === selectedMinitest.id ? response.data.data : minitest
          )
        );
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Minitest updated successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const response = await axiosInstance.post(`/minitest/${minitestData.lessonId}`, minitestData);
        setMinitests((prevMinitests) => [...prevMinitests, response.data.data]);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Minitest added successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
      }
      handleCloseModal();
    } catch (error) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Failed to save the minitest.',
        text: (error as Error)?.message || 'An unexpected error occurred.',
        showConfirmButton: true,
      });
      console.error('Error saving minitest:', error);
    }
  };

  const handleDeleteMinitest = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this minitest?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/minitest/${id}`);
        setMinitests((prevMinitests) => prevMinitests.filter((minitest) => minitest.id !== id));
        Swal.fire('Deleted!', 'The minitest has been deleted.', 'success');
      } catch (error) {
        Swal.fire('Error!', 'Error deleting minitest: ' + (error as Error)?.message, 'error');
      }
    }
  };

  return (
    <div className="flex">
      <main className="flex-1 p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h1 className="text-2xl font-bold mb-6">Minitests Management</h1>
          <button
            onClick={() => handleOpenModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4 shadow-md transition-colors duration-200"
          >
            Add New Minitest
          </button>
          <MinitestTable minitests={minitests} onEdit={handleOpenModal} onDelete={handleDeleteMinitest} />
        </motion.div>

        <AnimatePresence>
          {isModalOpen && (
            <MinitestModal
              minitest={selectedMinitest}
              lessons={lessons} // Passing lessons to the modal
              onClose={handleCloseModal}
              onSave={handleSaveMinitest}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default MinitestPage;

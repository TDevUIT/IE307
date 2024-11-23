'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FlashcardTable from './_components/FlashcardTable';
import FlashcardModal from './_components/FlashcardModal';
import { FlashCard, Lesson } from '@/app/types/types';
import axiosInstance from '@/app/helper/axios';
import Swal from 'sweetalert2';

const FlashcardPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [flashcards, setFlashcards] = useState<FlashCard[]>([]);
  const [selectedFlashcard, setSelectedFlashcard] = useState<FlashCard | undefined>(undefined);
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [flashcardResponse, lessonsResponse] = await Promise.all([
          axiosInstance.get('/flashcard'),
          axiosInstance.get('/lessons/all/names'),
        ]);
        
        setFlashcards(flashcardResponse.data.data);
        setLessons(lessonsResponse.data.data); 
      } catch (error) {
        console.error('Error fetching flashcards and lessons:', error);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = (flashcard?: FlashCard) => {
    setSelectedFlashcard(flashcard);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedFlashcard(undefined);
  };

  const handleSaveFlashcard = async (flashcardData: { term: string; definition: string; kanji: string; lessonId: string }) => {
    try {
      if (selectedFlashcard) {
        const response = await axiosInstance.put(`/flashcard/${selectedFlashcard.id}`, flashcardData);
        setFlashcards((prevFlashcards) =>
          prevFlashcards.map((flashcard) =>
            flashcard.id === selectedFlashcard.id ? response.data.data : flashcard
          )
        );
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Flashcard updated successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const response = await axiosInstance.post(`/flashcard/${flashcardData.lessonId}`, flashcardData);
        setFlashcards((prevFlashcards) => [...prevFlashcards, response.data.data]);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Flashcard added successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
      }
      handleCloseModal();
    } catch (error) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Failed to save the flashcard.',
        text: (error as Error)?.message || 'An unexpected error occurred.',
        showConfirmButton: true,
      });
      console.error('Error saving flashcard:', error);
    }
  };

  const handleDeleteFlashcard = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this flashcard?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/flashcard/${id}`);
        setFlashcards((prevFlashcards) => prevFlashcards.filter((flashcard) => flashcard.id !== id));
        Swal.fire('Deleted!', 'The flashcard has been deleted.', 'success');
      } catch (error) {
        Swal.fire('Error!', 'Error deleting flashcard: ' + (error as Error)?.message, 'error');
      }
    }
  };

  return (
    <div className="flex">
      <main className="flex-1 p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h1 className="text-2xl font-bold mb-6">Flashcards Management</h1>
          <button
            onClick={() => handleOpenModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4 shadow-md transition-colors duration-200"
          >
            Add New Flashcard
          </button>
          <FlashcardTable flashcards={flashcards} onEdit={handleOpenModal} onDelete={handleDeleteFlashcard} />
        </motion.div>

        <AnimatePresence>
          {isModalOpen && (
            <FlashcardModal
              flashcard={selectedFlashcard}
              lessons={lessons}
              onClose={handleCloseModal}
              onSave={handleSaveFlashcard}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default FlashcardPage;

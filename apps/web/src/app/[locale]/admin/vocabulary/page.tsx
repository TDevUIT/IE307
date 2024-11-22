'use client'
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VocabularyTable from './_components/VocabularyTable';
import VocabularyModal from './_components/VocabularyModal';
import { Vocabulary, Lesson } from '@/app/types/types';
import axiosInstance from '@/app/helper/axios';
import Swal from 'sweetalert2';

const VocabularyPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
  const [selectedVocabulary, setSelectedVocabulary] = useState<Vocabulary | undefined>(undefined);
  const [lessons, setLessons] = useState<Lesson[]>([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vocabResponse = await axiosInstance.get('/vocabularies');
        setVocabularies(vocabResponse.data.data);

        const lessonsResponse = await axiosInstance.get('/lessons/all/names');
        setLessons(lessonsResponse.data.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = (vocabulary?: Vocabulary) => {
    setSelectedVocabulary(vocabulary);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedVocabulary(undefined);
  };

  const handleSaveVocabulary = async (vocabularyData: { wordJP: string; wordVN: string; kanji: string; lessonId: string }) => {
    try {
      if (selectedVocabulary) {
        const response = await axiosInstance.put(`/vocabularies/${selectedVocabulary.id}`, vocabularyData);
        setVocabularies((prevVocabularies) =>
          prevVocabularies.map((vocabulary) =>
            vocabulary.id === selectedVocabulary.id ? response.data.data : vocabulary
          )
        );
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Vocabulary updated successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const response = await axiosInstance.post(`/vocabularies/${vocabularyData.lessonId}`, vocabularyData);
        setVocabularies((prevVocabularies) => [...prevVocabularies, response.data.data]);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Vocabulary added successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
      }
      handleCloseModal();
    } catch (error) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Failed to save the vocabulary.',
        text: (error as Error)?.message || 'An unexpected error occurred.',
        showConfirmButton: true,
      });
      console.error('Error saving vocabulary:', error);
    }
  };

  const handleDeleteVocabulary = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this vocabulary?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/vocabularies/${id}`);
        setVocabularies((prevVocabularies) => prevVocabularies.filter((vocabulary) => vocabulary.id !== id));
        Swal.fire('Deleted!', 'The vocabulary has been deleted.', 'success');
      } catch (error) {
        Swal.fire('Error!', 'Error deleting vocabulary: ' + (error as Error)?.message, 'error');
      }
    }
  };

  return (
    <div className="flex">
      <main className="flex-1 p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h1 className="text-2xl font-bold mb-6">Vocabulary Management</h1>
          <button
            onClick={() => handleOpenModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4 shadow-md transition-colors duration-200"
          >
            Add New Vocabulary
          </button>
          <VocabularyTable
            vocabularies={vocabularies}
            onEdit={handleOpenModal}
            onDelete={handleDeleteVocabulary}
          />
        </motion.div>

        <AnimatePresence>
          {isModalOpen && (
            <VocabularyModal
              vocabulary={selectedVocabulary ? { ...selectedVocabulary, lessonId: selectedVocabulary.lessonId.toString() } : undefined}
              onClose={handleCloseModal}
              onSave={handleSaveVocabulary}
              lessons={lessons} 
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default VocabularyPage;

'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GrammarTable from './_components/GrammarTable';
import GrammarModal from './_components/GrammarModal';
import { Grammar, Lesson } from '@/app/types/types';
import axiosInstance from '@/app/helper/axios';
import Swal from 'sweetalert2';


const GrammarPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [grammars, setGrammars] = useState<Grammar[]>([]);
  const [selectedGrammar, setSelectedGrammar] = useState<Grammar | undefined>(undefined);
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    const fetchGrammars = async () => {
      try {
        const response = await axiosInstance.get('/grammar');
        setGrammars(response.data.data);
        const lessonsResponse = await axiosInstance.get('/lessons/all/names');
        setLessons(lessonsResponse.data.data); 
      } catch (error) {
        console.error('Error fetching grammars:', error);
      }
    };

    fetchGrammars();
  }, []);

  const handleOpenModal = (grammar?: Grammar) => {
    setSelectedGrammar(grammar);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedGrammar(undefined);
  };

  const handleSaveGrammar = async (grammarData: { rule: string; description: string; lessonId: string }) => {
    try {
      if (selectedGrammar) {
        const response = await axiosInstance.put(`/grammar/${selectedGrammar.id}`, grammarData);
        setGrammars((prevGrammars) =>
          prevGrammars.map((grammar) =>
            grammar.id === selectedGrammar.id ? response.data.data : grammar
          )
        );
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Grammar updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const response = await axiosInstance.post(`/grammar/${grammarData.lessonId}`, grammarData);
        setGrammars((prevGrammars) => [...prevGrammars, response.data.data]);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Grammar added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      handleCloseModal();
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to save the grammar.",
        text: (error as Error)?.message || "An unexpected error occurred.",
        showConfirmButton: true,
      });
      console.error('Error saving grammar:', error);
    }
  };

  const handleDeleteGrammar = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this grammar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/grammar/${id}`);
        setGrammars((prevGrammars) => prevGrammars.filter((grammar) => grammar.id !== id));
        Swal.fire('Deleted!', 'The grammar has been deleted.', 'success');
      } catch (error) {
        Swal.fire('Error!', 'Error deleting grammar: ' + (error as Error)?.message, 'error');
      }
    }
  };

  return (
    <div className="flex">
      <main className="flex-1 p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h1 className="text-2xl font-bold mb-6">Grammar Management</h1>
          <button
            onClick={() => handleOpenModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4 shadow-md transition-colors duration-200"
          >
            Add New Grammar
          </button>
          <GrammarTable grammars={grammars} onEdit={handleOpenModal} onDelete={handleDeleteGrammar} />
        </motion.div>

        <AnimatePresence>
          {isModalOpen && (
            <GrammarModal
              grammar={selectedGrammar}
              lessons={lessons} // Pass the lessons to the modal
              onClose={handleCloseModal}
              onSave={handleSaveGrammar}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default GrammarPage;

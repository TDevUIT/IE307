'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LessonTable from './_components/LessonTable';
import LessonModal from './_components/LessonModal';
import { Lesson } from '@/app/types/types';
import axiosInstance from '@/app/helper/axios';
import Swal from 'sweetalert2';

const LessonsPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | undefined>(undefined);
  const [courses, setCourses] = useState<{ id: string; title: string }[]>([]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axiosInstance.get('/lessons');
        setLessons(response.data.data);
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get('/course/all/names');
        setCourses(response.data.data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };

    fetchLessons();
    fetchCourses();
  }, []);

  const handleOpenModal = (lesson?: Lesson) => {
    setSelectedLesson(lesson);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedLesson(undefined);
  };

  const handleSaveLesson = async (lessonData: { title: string; content: string; courseId?: string }) => {
    try {
      if (selectedLesson) {
        const response = await axiosInstance.put(`/lessons/${selectedLesson.id}`, lessonData);
        setLessons((prevLessons) =>
          prevLessons.map((lesson) =>
            lesson.id === selectedLesson.id ? response.data.data : lesson
          )
        );
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Lesson updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const response = await axiosInstance.post('/lessons', lessonData);
        setLessons((prevLessons) => [...prevLessons, response.data.data]);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Lesson added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      handleCloseModal();
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to save the lesson.",
        text: (error as Error)?.message || "An unexpected error occurred.",
        showConfirmButton: true,
      });
      console.error('Error saving lesson:', error);
    }
  };
  

  const handleDeleteLesson = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this lesson?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/lessons/${id}`);
        setLessons((prevLessons) => prevLessons.filter((lesson) => lesson.id.toString() !== id));
        Swal.fire('Deleted!', 'The lesson has been deleted.', 'success');
      } catch (error) {
        Swal.fire('Error!', 'Error deleting lesson: ' + (error as Error)?.message, 'error');
      }
    }
  };

  return (
    <div className="flex">
      <main className="flex-1 p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h1 className="text-2xl font-bold mb-6">Lessons Management</h1>
          <button
            onClick={() => handleOpenModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4 shadow-md transition-colors duration-200"
          >
            Add New Lesson
          </button>
          <LessonTable
            lessons={lessons}
            onEdit={handleOpenModal}
            onDelete={handleDeleteLesson}
          />
        </motion.div>

        <AnimatePresence>
          {isModalOpen && (
            <LessonModal
              lesson={selectedLesson}
              courses={courses} 
              onClose={handleCloseModal}
              onSave={handleSaveLesson}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default LessonsPage;


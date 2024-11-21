'use client'
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CourseTable from './_components/CourseTable';
import CourseModal from './_components/CourseModal';
import { Course } from '@/app/types/types';
import axiosInstance from '@/app/helper/axios';
import Swal from 'sweetalert2';
const CoursesPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | undefined>(undefined);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get('/course/all');
        setCourses(response.data.data);
        console.log('Courses:', response.data.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleOpenModal = (course?: Course) => {
    setSelectedCourse(course);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCourse(undefined);
  };

  const handleSaveCourse = async (courseData: { title: string; description: string }) => {
    try {
      if (selectedCourse) {
        const response = await axiosInstance.put(`/course/${selectedCourse.id}`, courseData);
        setCourses((prevCourses) =>
          prevCourses.map((course) =>
            course.id === selectedCourse.id ? response.data.data : course
          )
        );
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Course updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const response = await axiosInstance.post('/course', courseData);
        setCourses((prevCourses) => [...prevCourses, response.data.data]);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Course added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      handleCloseModal();
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to save the course.",
        text: (error as Error)?.message || "An unexpected error occurred.",
        showConfirmButton: true,
      });
      console.error('Error saving course:', error);
    }
  };
  

  const handleDeleteCourse = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this course?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });
  
    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/course/${id}`);
        setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));
        Swal.fire('Deleted!', 'The course has been deleted.', 'success');
      } catch (error) {
        Swal.fire('Error!', 'Error deleting course: ' + (error as Error)?.message, 'error');
      }
    }
  };

  return (
    <div className="flex">
      <main className="flex-1 p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h1 className="text-2xl font-bold mb-6">Courses Management</h1>
          <button
            onClick={() => handleOpenModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4 shadow-md transition-colors duration-200"
          >
            Add New Course
          </button>
          <CourseTable
            courses={courses}
            onEdit={handleOpenModal}
            onDelete={handleDeleteCourse}
          />
        </motion.div>

        <AnimatePresence>
          {isModalOpen && (
            <CourseModal
              course={selectedCourse}
              onClose={handleCloseModal}
              onSave={handleSaveCourse}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default CoursesPage;

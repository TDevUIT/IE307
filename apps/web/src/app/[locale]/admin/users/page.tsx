'use client'
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UserModal from './_components/UserModal';
import UserCourse from './_components/UserTable';
import { User } from '@/app/types/types'; 
import axiosInstance from '@/app/helper/axios';

const UserPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/user');
        setUsers(response.data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUser(undefined);
  };

  return (
    <div className="flex">
      <main className="flex-1 p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h1 className="text-2xl font-bold mb-6">Users Management</h1>
          <UserCourse users={users} onView={handleViewUser} />
        </motion.div>

        <AnimatePresence>
          {isModalOpen && (
            <UserModal user={selectedUser} onClose={handleCloseModal} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default UserPage;

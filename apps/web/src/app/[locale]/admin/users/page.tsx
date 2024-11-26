'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import UserModal from './_components/UserModal';
import UserCourse from './_components/UserTable';
import { User } from '@/app/types/types';
import axiosInstance from '@/app/helper/axios';
import { useAuth } from "@/context/AuthContext";
const UserPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const { profile } = useAuth();
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/user');
        setUsers(response.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        Swal.fire('Error', 'Failed to fetch users.', 'error');
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

  const handleUpdateRole = async (userId: string, is_admin: boolean) => {
    setLoading(true);
    if(profile?.id === userId) {
      setLoading(false);
      return Swal.fire('Error', 'You cannot change your own role.', 'error');
    }
    try {
      await axiosInstance.post('/user/update-rule', { userId, is_admin });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, is_admin } : user
        )
      );
      setLoading(false);
      Swal.fire(
        'Success',
        `User role updated to ${is_admin ? 'Admin' : 'User'}.`,
        'success'
      );
    } catch (error) {
      setLoading(false);
      Swal.fire('Error', 'Failed to update user role.', 'error');
    }
  };

  return (
    <div className="flex">
      <main className="flex-1 p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold mb-6">Users Management</h1>
          {loading ? (
            <div className="text-center text-lg">Loading...</div>
          ) : (
            <UserCourse users={users} onView={handleViewUser} onUpdateRole={handleUpdateRole} />
          )}
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

'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { User } from '@/app/types/types';

interface UserModalProps {
  user?: User | null;
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ user, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4"
      >
        <h2 className="text-xl font-semibold mb-6">User Details</h2>
        <div className="mb-4">
          <strong>Name: </strong> {user?.name}
        </div>
        <div className="mb-4">
          <strong>Email: </strong> {user?.email}
        </div>
        <div className="mb-4">
          <strong>Role: </strong> {user?.is_admin ? 'Admin' : 'User'}
        </div>
        <div className="mb-4">
          <strong>Created At: </strong> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="text-gray-500 mr-4 hover:text-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserModal;

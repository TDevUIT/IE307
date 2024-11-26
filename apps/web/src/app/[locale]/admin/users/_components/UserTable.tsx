'use client';
import { User } from '@/app/types/types';
import React from 'react';

interface UserCourseProps {
  users: User[];
  onView: (user: User) => void;
  onUpdateRole: (userId: string, is_admin: boolean) => void;
}

const UserCourse: React.FC<UserCourseProps> = ({ users, onView, onUpdateRole }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Created At</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{new Date(user.createdAt).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{user.is_admin ? 'Admin' : 'User'}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => onView(user)}
                  className="text-blue-500 hover:underline mr-8 bg-gray-100 px-2 py-1 rounded-xl"
                >
                  View
                </button>
                <button
                  onClick={() => onUpdateRole(user.id, !user.is_admin)}
                  className={`px-2 py-1 rounded ${
                    user.is_admin ? 'bg-red-400 text-white px-2 py-1 rounded-xl' : 'bg-green-400 text-white px-2 py-1 rounded-xl'
                  }`}
                >
                  {user.is_admin ? 'Revoke Admin' : 'Grant Admin'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserCourse;

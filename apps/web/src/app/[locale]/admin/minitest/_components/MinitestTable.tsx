import React from 'react';
import { MiniTest } from '@/app/types/types';

interface MinitestTableProps {
  minitests: MiniTest[];
  onEdit: (minitest: MiniTest) => void;
  onDelete: (id: string) => void;
}

const MinitestTable: React.FC<MinitestTableProps> = ({ minitests, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left">question</th>
            <th className="py-2 px-4 text-left">answer</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {minitests.map((minitest) => (
            <tr key={minitest.id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{minitest.question}</td>
              <td className="py-2 px-4">{minitest.answer}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => onEdit(minitest)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(minitest.id)}
                  className="ml-4 text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MinitestTable;

import React from 'react';
import { Grammar } from '@/app/types/types';

interface GrammarTableProps {
  grammars: Grammar[];
  onEdit: (grammar: Grammar) => void;
  onDelete: (id: string) => void;
}

const GrammarTable: React.FC<GrammarTableProps> = ({ grammars, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left">Rule</th>
            <th className="py-2 px-4 text-left">Description</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {grammars.map((grammar) => (
            <tr key={grammar.id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{grammar.rule}</td>
              <td className="py-2 px-4">{grammar.description}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => onEdit(grammar)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(grammar.id)}
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

export default GrammarTable;

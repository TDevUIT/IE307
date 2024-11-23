import React from 'react';
import { FlashCard } from '@/app/types/types';

interface FlashcardTableProps {
  flashcards: FlashCard[];
  onEdit: (flashcard?: FlashCard) => void;
  onDelete: (id: string) => void;
}

const FlashcardTable: React.FC<FlashcardTableProps> = ({ flashcards, onEdit, onDelete }) => {
  return (
    <table className="min-w-full table-auto border-collapse">
      <thead>
        <tr>
          <th className="border-b px-4 py-2">Term</th>
          <th className="border-b px-4 py-2">Kanji</th>
            <th className="border-b px-4 py-2">Definition</th>
          <th className="border-b px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {flashcards.map((flashcard) => (
          <tr key={flashcard.id}>
            <td className="border-b px-4 py-2">{flashcard.term}</td>
            <td className="border-b px-4 py-2">{flashcard.kanji}</td>
            <td className="border-b px-4 py-2">{flashcard.definition}</td>
            <td className="border-b px-4 py-2">
              <button
                onClick={() => onEdit(flashcard)}
                className="text-blue-500 hover:text-blue-700 px-2 py-1"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(flashcard.id)}
                className="text-red-500 hover:text-red-700 px-2 py-1 ml-4"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FlashcardTable;

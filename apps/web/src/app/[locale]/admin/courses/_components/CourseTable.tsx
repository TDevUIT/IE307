import React from 'react';

interface CourseTableProps {
  onEdit: () => void;
}

const CourseTable: React.FC<CourseTableProps> = ({ onEdit }) => {
  return (
    <table className="w-full border border-gray-300">
      <thead>
        <tr>
          <th className="border px-4 py-2">Title</th>
          <th className="border px-4 py-2">Description</th>
          <th className="border px-4 py-2">Lessons</th>
          <th className="border px-4 py-2">Created By</th>
          <th className="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border px-4 py-2">Japanese N5</td>
          <td className="border px-4 py-2">Basic level Japanese course</td>
          <td className="border px-4 py-2">12</td>
          <td className="border px-4 py-2">Admin</td>
          <td className="border px-4 py-2">
            <button onClick={onEdit} className="text-blue-500 hover:underline">
              Edit
            </button>
            <button className="ml-2 text-red-500 hover:underline">
              Delete
            </button>
          </td>
        </tr>
        {/* More rows */}
      </tbody>
    </table>
  );
};

export default CourseTable;

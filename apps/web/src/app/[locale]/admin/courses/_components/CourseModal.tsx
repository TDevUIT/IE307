import React from 'react';

interface CourseModalProps {
  onClose: () => void;
}

const CourseModal: React.FC<CourseModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg w-1/3">
        <h2 className="text-lg font-semibold mb-4">Add / Edit Course</h2>
        <form>
          <label className="block mb-2">
            Title:
            <input type="text" className="w-full border border-gray-300 p-2 rounded" />
          </label>
          <label className="block mb-2">
            Description:
            <textarea className="w-full border border-gray-300 p-2 rounded"></textarea>
          </label>
          <button type="submit" className="btn btn-primary mr-2">Save</button>
          <button onClick={onClose} className="btn btn-secondary">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default CourseModal;

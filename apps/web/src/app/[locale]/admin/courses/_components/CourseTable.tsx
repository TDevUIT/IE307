import React from 'react';
import { useTable } from 'react-table';

interface Course {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  lessons: number;
  createdAt: string;
}

interface CourseTableProps {
  courses: Course[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const CourseTable: React.FC<CourseTableProps> = ({ courses, onEdit, onDelete }) => {
  const data = React.useMemo(() => courses, [courses]);

  const columns = React.useMemo(
    () => [
      { Header: 'Title', accessor: 'title' },
      { Header: 'Description', accessor: 'description' },
      { Header: 'Lessons', accessor: 'lessons' },
      { Header: 'Created By', accessor: 'createdBy' },
      {
        Header: 'Actions',
        Cell: ({ row }: { row: any }) => (
          <div>
            <button
              onClick={() => onEdit(row.original.id)}
              className="text-blue-500 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(row.original.id)}
              className="ml-2 text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [onEdit, onDelete]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <table {...getTableProps()} className="w-full border border-gray-300">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} key={column.id} className="border px-4 py-2">
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={row.id}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} key={cell.column.id} className="border px-4 py-2">
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CourseTable;

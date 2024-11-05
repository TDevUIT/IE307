/* eslint-disable @typescript-eslint/no-explicit-any */
import { Course } from '@/app/types/types';
import React from 'react';
import { useTable, Column } from 'react-table';

interface CourseTableProps {
  courses: Course[];
  onEdit: (course: Course) => void;
  onDelete: (id: string) => void;
}

const CourseTable: React.FC<CourseTableProps> = ({ courses = [], onEdit, onDelete }) => {
  const data = React.useMemo(() => courses, [courses]);

  const columns = React.useMemo<Column<Course>[]>(
    () => [
      { Header: 'Title', accessor: 'title' as const },
      { Header: 'Description', accessor: 'description' as const },
      {
        Header: 'Lessons',
        accessor: (course: Course) => course.lessons?.length || 0,
        Cell: ({ value }: { value: number }) => <span>{value} lessons</span>,
      },
      {
        Header: 'Created By',
        accessor: (course: Course) => course.createdBy?.name || 'Unknown',
        Cell: ({ value }: { value: string }) => <span>{value}</span>,
      },
      {
        Header: 'Actions',
        Cell: ({ row }: { row: { original: Course } }) => (
          <div>
            <button
              onClick={() => onEdit(row.original)}
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

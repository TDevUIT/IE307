import React from 'react';
import { useTable, Column } from 'react-table';
import { Lesson } from '@/app/types/types';

interface LessonTableProps {
  lessons: Lesson[];
  onEdit: (lesson: Lesson) => void;
  onDelete: (id: string) => void;
}

const LessonTable: React.FC<LessonTableProps> = ({ lessons = [], onEdit, onDelete }) => {
  const data = React.useMemo(() => lessons, [lessons]);

  const columns = React.useMemo<Column<Lesson>[]>(() => [
    { Header: 'Title', accessor: 'title' as const },
    { Header: 'Content', accessor: 'content' as const },
    {
        Header: 'FlashCards',
        accessor: (lesson: Lesson) => lesson.flashCards?.length || 0,
        Cell: ({ value }: { value: number }) => <span>{value} FlashCards</span>,
      },
      {
        Header: 'Grammars',
        accessor: (lesson: Lesson) => lesson.grammars?.length || 0,
        Cell: ({ value }: { value: number }) => <span>{value} grammars</span>,
      },
      {
        Header: 'Vocabularies',
        accessor: (lesson: Lesson) => lesson.vocabularies?.length || 0,
        Cell: ({ value }: { value: number }) => <span>{value} vocabularies</span>,
      },
      {
        Header: 'Minitests',
        accessor: (lesson: Lesson) => lesson.miniTests?.length || 0,
        Cell: ({ value }: { value: number }) => <span>{value} miniTests</span>,
      },
    {
      Header: 'Actions',
      Cell: ({ row }: { row: { original: Lesson } }) => (
        <div>
          <button
            onClick={() => onEdit(row.original)}
            className="text-blue-500 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(row.original.id.toString())}
            className="ml-2 text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      ),
    },
  ], [onEdit, onDelete]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <table {...getTableProps()} className="w-full border border-gray-300">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} key={column.id} className="border px-4 py-2">
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={row.id}>
              {row.cells.map(cell => (
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

export default LessonTable;

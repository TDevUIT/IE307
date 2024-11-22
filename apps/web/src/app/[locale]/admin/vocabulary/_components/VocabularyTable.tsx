'use client'
import React from 'react';
import { useTable, Column } from 'react-table';
import { Vocabulary } from '@/app/types/types';

interface VocabularyTableProps {
  vocabularies: Vocabulary[];
  onEdit: (vocabulary: Vocabulary) => void;
  onDelete: (id: string) => void;
}

const VocabularyTable: React.FC<VocabularyTableProps> = ({ vocabularies, onEdit, onDelete }) => {
  const columns: Column<Vocabulary>[] = React.useMemo(
    () => [
      { Header: 'Japanese Word', accessor: 'wordJP' },
      { Header: 'Vietnamese Meaning', accessor: 'wordVN' },
      { Header: 'Kanji', accessor: 'kanji' },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div>
            <button onClick={() => onEdit(row.original)} className="text-blue-600 hover:underline mr-3">
              Edit
            </button>
            <button onClick={() => onDelete(row.original.id)} className="text-red-600 hover:underline">
              Delete
            </button>
          </div>
        ),
      },
    ],
    [onEdit, onDelete]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: vocabularies });

  return (
    <table {...getTableProps()} className="w-full table-auto border-collapse">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} key={column.id} className="px-4 py-2 text-left border-b">{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={row.id} className="hover:bg-gray-100">
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} key={cell.column.id} className="px-4 py-2 border-b">{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default VocabularyTable;

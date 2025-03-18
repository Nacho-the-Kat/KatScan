import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";

interface TableProps<T extends object> {
  columns: ColumnDef<T, unknown>[];
  data: T[];
  summaryText?: string;
  subText?: string;
}

const Table = <T extends object>({ columns, data, summaryText, subText }: TableProps<T>) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
      {(summaryText || subText) && (
        <div className="p-4 font-bold text-md bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 font-medium">
          {summaryText && <p>{summaryText}</p>}
          {subText && <p>{subText}</p>}
        </div>
      )}
      <table className={`min-w-full border-collapse ${summaryText || subText ? '' : 'border-t border-gray-200 dark:border-gray-700'}`}>
        <thead className="bg-gray-500 dark:bg-gray-900 text-black dark:text-white text-sm text-left">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-4 py-2 border-b border-gray-700 text-white">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="bg-gray-50 text-black dark:text-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-900 transition">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-black dark:text-white text-md">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

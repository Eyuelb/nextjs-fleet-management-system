import React from "react";

interface TableProps {
  data: { [key: string]: any }[] | undefined;
  onDelete: (id: string) => void;
}

const TableComponent: React.FC<TableProps> = ({ data, onDelete }) => {
  if (!data || data.length === 0) {
    return <div className="text-center">No data available</div>;
  }

  const columns = Object.keys(data[0]);

  return (
    <table className="border border-gray-300 p-4">
      <thead className="bg-gray-50">
        <tr>
          {columns.map((column) => (
            <th
              key={column}
              className="border px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {column}
            </th>
          ))}
          <th>Action</th>
        </tr>
      </thead>
      <tbody className="bg-white  border divide-gray-200">
        {data.map((row, index) => (
          <tr key={index} className=" divide-gray-200">
            {columns.map((column) => (
              <td
                key={column}
                className="border max-w-[150px] text-xs overflow-hidden text-ellipsis text-nowrap p-2 whitespace-nowrap border-b border-gray-200"
              >
                <span className="">{row[column]}</span>
              </td>
            ))}
            <td>
              <button onClick={() => onDelete(row["id"])}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;

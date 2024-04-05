import { Table } from "@mantine/core";
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
    <Table.ScrollContainer minWidth={500}>
      <Table withColumnBorders withTableBorder className="">
        <Table.Thead className="">
          <Table.Tr>
            {columns.map((column) => (
              <Table.Th
                key={column}
                className="border px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
              >
                {column}
              </Table.Th>
            ))}
            <Table.Th>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody className=" border ">
          {data.map((row, index) => (
            <Table.Tr key={index} className=" ">
              {columns.map((column) => (
                <Table.Td
                  key={column}
                  className="border max-w-[150px] text-xs overflow-hidden text-ellipsis text-nowrap p-2 whitespace-nowrap border-b "
                >
                  <span className="">{row[column]}</span>
                </Table.Td>
              ))}
              <Table.Td>
                <button onClick={() => onDelete(row["id"])}>Delete</button>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};

export default TableComponent;

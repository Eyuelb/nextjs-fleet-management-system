// ActionButtons.tsx
import QueryButton from "@/lib/react-query/components/query-button";
import { ActionIcon, Button } from "@mantine/core";
import { IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
type QueryType = "Get" | "Post" | "Put" | "Delete";

export const CreateButton: React.FC<{ path: string }> = ({ path }) => {
  return (
    <Button component={Link} href={`/${path}/create`}>
      Create
    </Button>
  );
};

export const UpdateButton: React.FC<{ id: number; path: string }> = ({
  id,
  path,
}) => {
  return (
    <Link href={`/${path}/update/${id}`}>
      <IconPencil
        size={16}
        style={{
          color: "blue",
        }}
        stroke={1.8}
      />
    </Link>
  );
};

export const ViewButton: React.FC<{ id: number; path: string }> = ({
  id,
  path,
}) => {
  return (
    <Link href={`/${path}/view/${id}`}>
      <IconEye size={16} stroke={1.8} />
    </Link>
  );
};

export const DeleteButton: React.FC<{
  type: QueryType;
  url: string;
  queryKey?: string;
}> = ({ url, type, queryKey }) => {
  return (
    <QueryButton queryType={type} url={url} queryKey={queryKey}>
      <IconTrash size={16} stroke={1.8} color="red" />
    </QueryButton>
  );
};

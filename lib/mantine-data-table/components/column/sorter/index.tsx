'use client';

import React from 'react';
import { ActionIcon } from '@mantine/core';
import { IconArrowsSort, IconSortAscending, IconSortDescending } from '@tabler/icons-react';

import { ColumnButtonProps } from '../../../interfaces';

export const ColumnSorter: React.FC<ColumnButtonProps> = ({ column }) => {
  if (!column.getCanSort()) {
    return null;
  }

  const sorted = column.getIsSorted();

  return (
    <ActionIcon
      size="18"
      onClick={column.getToggleSortingHandler()}
      variant={sorted ? 'light' : 'transparent'}
      color={sorted ? 'primary' : 'gray'}
      title="Sort"
    >
      {sorted === 'asc' ? (
        <IconSortAscending size={18} />
      ) : sorted === 'desc' ? (
        <IconSortDescending size={18} />
      ) : (
        <IconArrowsSort size={18} />
      )}
    </ActionIcon>
  );
};

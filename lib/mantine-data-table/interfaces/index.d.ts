import { Column } from '@tanstack/react-table';

export interface ICategory {
  id: number;
  header: string;
}

export interface IPost {
  id: number;
  header: string;
  content: string;
  status: 'published' | 'draft' | 'rejected';
  category: { id: number };
}

export interface ColumnButtonProps {
  column: Column<any, any>; // eslint-disable-line
}

export interface FilterElementProps {
  value: any; // eslint-disable-line
  onChange: (value: any) => void; // eslint-disable-line
}

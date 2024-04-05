'use client';
import { Flex } from '@mantine/core';
import { useState } from 'react';
import styles from './layout.module.scss';
import Sidebar from '../sidebar';
import Header from '../header';
import { useDisclosure } from '@mantine/hooks';
interface Props {
  children: React.ReactNode;
}
export default function AppShell({ children }: Props) {
  const [isSidebarOpen, { toggle: onSidebarClose }] =
    useDisclosure(false);
  return (
    <main className={styles.root}>
      <aside className={styles.sidebar}>
        <Sidebar isSidebarOpen={isSidebarOpen} onSidebarClose={onSidebarClose} />
      </aside>
      <div className={styles.main}>
        <Header isSidebarOpen={isSidebarOpen} onSidebarClose={onSidebarClose} />
        <section className="p-4 w-full mt-14">
        {children}
        </section>
      </div>
    </main>
  );
}
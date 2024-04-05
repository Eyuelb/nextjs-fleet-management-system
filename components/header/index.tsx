"use client";
import {
  IconBell,
  IconChevronDown,
  IconLanguage,
  IconLogin,
  IconLogout,
  IconMoon,
  IconSettings,
  IconSun,
  IconSwitchHorizontal,
  IconUserCircle,
  IconWebhook,
} from "@tabler/icons-react";
import styles from "./headerMenu.module.scss";
import {
  ActionIcon,
  Box,
  Burger,
  Flex,
  Group,
  Menu,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ThemeToggleButton from "@/lib/mantine/component/toggle-button";
export interface HeaderProps {
  isSidebarOpen: boolean;
  onSidebarClose: () => void;
}
const Header: React.FC<HeaderProps> = ({ isSidebarOpen, onSidebarClose }) => {
  return (
    <header className={styles.header}>
      <div>
      <Burger
        opened={isSidebarOpen}
        onClick={onSidebarClose}
        size="sm"
        hiddenFrom="lg"
      />
      </div>

      <Flex gap={6} align={"center"}>
        <NotificationIcon />
        <UserAccountIcon />
        <ThemeToggleButton />
        {/* <Select
          radius={10}
          w={100}
          leftSection={<IconLanguage size={20} stroke={1.8} />}
          data={languages.map((lang) => lang)}
          onChange={(value) => toggle(value as Language)}
        /> */}
      </Flex>
    </header>
  );
};

const UserAccountIcon = () => {
  // const { isAuthenticated, logout } = useAuth();
  const [opened, { open, close }] = useDisclosure();
  const isAuthenticated = false;
  const authStatus = isAuthenticated
    ? { state: "Logout", icon: <IconLogout size="0.9rem" stroke={1.5} /> }
    : { state: "Login", icon: <IconLogin size="0.9rem" stroke={1.5} /> };

  return (
    <Box>
      <Menu
        width={260}
        position="bottom-end"
        transitionProps={{ transition: "pop-top-right" }}
        onClose={close}
        onOpen={open}
        withinPortal
      >
        <Menu.Target>
          <UnstyledButton className={styles.user}>
            <Group gap={7}>
              <IconUserCircle size={20} />

              <Text fw={500} size="sm" mr={3}>
                Test Name
              </Text>
              <IconChevronDown size={14} stroke={1.5} />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Settings</Menu.Label>
          <Menu.Item leftSection={<IconSettings size="0.9rem" stroke={1.5} />}>
            Account settings
          </Menu.Item>
          <Menu.Item
            leftSection={<IconSwitchHorizontal size="0.9rem" stroke={1.5} />}
          >
            Change account
          </Menu.Item>
          {/* <Menu.Item
            leftSection={authStatus.icon}
            onClick={() => {
              isAuthenticated && logout();
            }}
          >
            {authStatus.state}
          </Menu.Item> */}
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
};
const NotificationIcon = () => {
  const [opened, { open, close }] = useDisclosure();

  return (
    <Box>
      <Menu
        width={260}
        position="bottom-end"
        transitionProps={{ transition: "pop-top-right" }}
        onClose={close}
        onOpen={open}
        withinPortal
      >
        <Menu.Target>
          <UnstyledButton className={styles.user}>
            <IconBell size={20} />
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>System maintenance Alert</Menu.Label>
          <Menu.Item leftSection={<IconSettings size="0.9rem" stroke={1.5} />}>
            The System will undergo maintenance tonight from 10
          </Menu.Item>
          <Menu.Label>System maintenance Alert</Menu.Label>
          <Menu.Item>
            The System will undergo maintenance tonight from 10
          </Menu.Item>
          <Menu.Item>Change account</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
};

export default Header
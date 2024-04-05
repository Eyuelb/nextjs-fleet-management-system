import {
  Box,
  Divider,
  Drawer,
  NavLink,
  rem,
  ScrollArea,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";
import styles from "./sidebar.module.scss";
import { SidebarLinks, SidebarProps } from "./model";
import { menuLinks } from "./menu";


const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, onSidebarClose }) => {
  const router = useRouter();
  const path = usePathname();

const handleClick = (link:string) =>{
  onSidebarClose()
  router.push(link)

}
  function createNavLinks(
    links: SidebarLinks[] | undefined,
    currentPath: string,
    router: any
  ) {
    return links?.map((link) => (
      <UnstyledButton
        
        key={link.label}
        className={`${styles.mainLink} ${
          currentPath === link.link && styles.activeLink
        }`}
        onClick={() => link.link && handleClick(link.link)}
      >
        <NavLink
          label={link.label}
          leftSection={link.icon && <link.icon size="1.2rem" stroke={1.5} />}
          key={link.label}
          className={!link.icon ? styles.sidebarChildren : ""}
        >
          {createNavLinks(link.links, currentPath, router)}
        </NavLink>
      </UnstyledButton>
    ));
  }
  return (
    <Box className={styles.sidebarMain}>
      <Box className={styles.mainLinks}>
        <Text className={styles.groupTitle}></Text>
        {createNavLinks(menuLinks, path, router)}
      </Box>
      <Drawer
        opened={isSidebarOpen}
        onClose={onSidebarClose}
        
        size="xs"
        padding="md"
        title="Side Bar"
        zIndex={1000000}
        bg={'gray'}
        hiddenFrom="lg"
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">

          <Box className={styles.mainLinks}>
            <Text className={styles.groupTitle}></Text>
            {createNavLinks(menuLinks, path, router)}
          </Box>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

export default Sidebar;

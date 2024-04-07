import { usePathname } from "next/navigation";

export function useActivePath() {
  const pathname = usePathname();
  const paths = pathname.split('/')
  const activePath = paths.length >= 2 ? paths[1] : ''

  const checkActivePath = (path: string) => {
    let originalPathName = pathname;

    if (path === "/" && originalPathName !== path) {
      return false;
    }
    return originalPathName.startsWith(path);
  };

  return {
    isActive: checkActivePath,
    activePath
  };
}

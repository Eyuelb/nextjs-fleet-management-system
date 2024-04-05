import Link from "next/link";
import { AppConfig } from "utils/app-config";

const Sidebar = () => {
  const links = Object.entries(AppConfig).map(([key, value]) => ({
    title: key,
    href: `/${value}`,
  }));

  return (
    <div className="w-[200px] bg-gray-800 text-white py-8 px-4">
      <h2 className="text-xl font-bold mb-4">Sidebar</h2>
      <ul className="w-full">
        {links.map((link, index) => (
          <li key={index}>
            <Link href={link.href} className="block py-2">
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

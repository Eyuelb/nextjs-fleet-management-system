import ReactQueryProvider from "@/lib/react-query/provider";
import "./globals.css";

import { Noto_Sans_SC } from "next/font/google";
import MantineProvider from "@/lib/mantine/provider";

let title = "Next.js + Postgres Auth Starter";
let description =
  "This is a Next.js starter kit that uses NextAuth.js for simple email + password login and a Postgres database to persist the data.";
const font = Noto_Sans_SC({ subsets: ["latin"] });

export const metadata = {
  title,
  description,
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  metadataBase: new URL("https://nextjs-postgres-auth.vercel.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={font.className}>
      <body>
        <MantineProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </MantineProvider>
      </body>
    </html>
  );
}

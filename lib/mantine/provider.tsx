import {
  MantineProvider as Provider,
  MantineThemeOverride,
  ColorSchemeScript,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import { theme as baseTheme } from "./theme";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/carousel/styles.css";
import { ModalsProvider } from "@mantine/modals";

export default function MantineProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme: Partial<MantineThemeOverride> = baseTheme;

  return (
    <Provider theme={theme} >
      <ColorSchemeScript  />
      <Notifications />
      <ModalsProvider>{children}</ModalsProvider>
    </Provider>
  );
}

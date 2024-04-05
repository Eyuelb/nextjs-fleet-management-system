"use client";
import {
  ActionIcon,
  ActionIconProps,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import React from "react";
import { useIsMounted } from "../../hooks/useIsMounted";

type Props = ActionIconProps;

const ThemeToggleButton = (props: Props) => {
  const isMounted = useIsMounted();
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  return (
    <React.Fragment>
      {isMounted ? (
        <ActionIcon
          onClick={() =>
            setColorScheme(computedColorScheme === "light" ? "dark" : "light")
          }
          variant="transparent"
          size="sm"
          {...props}
        >
          {computedColorScheme == "dark" && (
            <IconSun size={20} color="yellow" stroke={1.8} />
          )}
          {computedColorScheme == "light" && (
            <IconMoon size={20} color="gray" stroke={1.8} />
          )}
        </ActionIcon>
      ) : (
        <div className="w-5 h-5"></div>
      )}
    </React.Fragment>
  );
};

export default ThemeToggleButton;

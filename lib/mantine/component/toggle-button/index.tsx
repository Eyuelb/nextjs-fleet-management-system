"use client";
import {
  ActionIcon,
  ActionIconProps,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import React, { memo, useMemo } from "react";
import { useIsMounted } from "../../hooks/useIsMounted";

type Props = ActionIconProps;

const ThemeToggleButton = memo((props: Props) => {
  const isMounted = useIsMounted();
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const color = useMemo(()=>computedColorScheme,[computedColorScheme])
  return (
    <React.Fragment>
      {isMounted ? (
        <ActionIcon
          onClick={() =>
            setColorScheme(color === "light" ? "dark" : "light")
          }
          variant="transparent"
          size="sm"
          {...props}
        >
          {color == "dark" && (
            <IconSun size={20} color="yellow" stroke={1.8} />
          )}
          {color == "light" && (
            <IconMoon size={20} color="gray" stroke={1.8} />
          )}
        </ActionIcon>
      ) : (
        <div className="w-5 h-5"></div>
      )}
    </React.Fragment>
  );
});
ThemeToggleButton.displayName = "ThemeToggleButton";

export default ThemeToggleButton;

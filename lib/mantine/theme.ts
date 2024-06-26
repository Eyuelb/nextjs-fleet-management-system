import type { MantineThemeOverride } from "@mantine/core";
export const theme: Partial<MantineThemeOverride> = {
  defaultRadius: "sm",
  primaryColor: "primary",
  primaryShade: 9,
  fontFamily: "inherit",
  fontFamilyMonospace: "inherit",

  breakpoints: {
    xs: "412px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },

  colors: {
    primary: [
      "#f6eefc",
      "#e7d8f4",
      "#cfadea",
      "#b57ee1",
      "#9f58d9",
      "#9240d5",
      "#8c33d4",
      "#7927bc",
      "#6b22a8",
      "#5d1a93",
    ],
  },

  components: {
    Container: {
      defaultProps: {
        sizes: {
          xs: 540,
          sm: 720,
          md: 960,
          lg: 1140,
          xl: 1320,
        },
      },
    },
    Button: {
      defaultProps: {
        size: "xs",
      },
      styles: {
        section: {
          marginRight: 4,
          marginLeft: 1,
        },
      },
    },

    Input: {
      defaultProps: {
        size: "xs",
        miw: 100,
      },
      classNames: {
        root: "form-field",
        label: "font-bold",
      },
    },
    TextInput: {
      defaultProps: {
        size: "xs",
        miw: 100,
      },
      classNames: {
        root: "form-field",
        label: "font-bold",
        error: "min-h-[15px]",
      },
    },
    // TextInput: TextInput.extend({
    //   classNames: InputClasses
    // }),
    NumberInput: {
      defaultProps: {
        size: "xs",
        miw: 100,
      },
      classNames: {
        root: "form-field",
        label: "font-bold",
      },
    },
    Select: {
      defaultProps: {
        size: "xs",
        miw: 100,
      },
      classNames: {
        root: "form-field",
        label: "font-bold",
      },
    },
    PasswordInput: {
      defaultProps: {
        size: "xs",
        miw: 100,
      },
      classNames: {
        root: "form-field",
        label: "font-bold",
      },
    },
    DatePickerInput: {
      defaultProps: {
        size: "xs",
        miw: 100,
      },
      classNames: {
        root: "form-field",
        label: "font-bold",
      },
    },
    Checkbox: {
      defaultProps: {
        size: "xs",
        miw: 60,
      },
    },
    CheckboxGroup: {
      defaultProps: {
        size: "xs",
        miw: 100,
      },
      classNames: {
        root: "form-field",
        label: "font-bold",
      },
    },
    Radio: {
      defaultProps: {
        size: "xs",
        miw: 60,
      },
    },
    RadioGroup: {
      defaultProps: {
        size: "xs",
        miw: 100,
      },
      classNames: {
        root: "form-field",
        label: "font-bold",
      },
    },
    Textarea: {
      defaultProps: {
        size: "xs",
        miw: 100,
      },
      classNames: {
        root: "form-field",
        label: "font-bold",
      },
    },
    Breadcrumbs: {
      styles: {
        breadcrumb: {
          fontSize: "14px",
        },
      },
    },
    Paper: {
      styles: {
        root: {
          backgroundColor: "var(--card-color-body)",
        },
      },
    },
    AppShell: {
      styles: {
        main: {
          // backgroundColor: '#F3F4F6',
        },
        header: {
          height: 40,
        },
      },
    },
    Loader: {
      defaultProps: {
        type: "bars",
      },
    },
  },
};

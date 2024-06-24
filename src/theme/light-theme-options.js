import { typography } from "./dark-theme-options";

const neutral = {
  100: "#F3F4F6",
  200: "#E5E7EB",
  300: "#D1D5DB",
  400: "#9CA3AF",
  500: "#6B7280",
  600: "#4B5563",
  700: "#374151",
  800: "#1F2937",
  900: "#111827",
};

const divider = "#f7f6f9";

const colors = {
  origin: {
    main: "#FFBF69",
  },
  background: {
    main: "#FFF8F0",
    paper: "#FFF"
  },
  edit: {
    main: "#2f2b3d6b",
  },
  text: {
    main: "#323434",
  },
  inactive: {
    main: "#f7f6f9",
  },
  darkGray: {
    main: "rgb(99, 115, 129)",
  },
  lightGray: {
    main: "rgb(145, 158, 171)",
  },
  primary: {
    light: '#7DDCD3',
    dark: '#31B5A9',
    main: '#D36135',
    contrastText: '#fff'
  },
  secondary: {
    light: '#ACAFAF',
    main: '#A1A5A5',
    dark: '#8D9191',
    contrastText: '#fff'
  },
  error: {
    light: '#ED6F70',
    main: '#EA5455',
    dark: '#CE4A4B',
    contrastText: '#fff'
  },
  warning: {
    light: '#FFAB5A',
    main: '#FF9F43',
    dark: '#E08C3B',
    contrastText: '#fff'
  },
  info: {
    light: '#1FD5EB',
    main: '#00CFE8',
    dark: '#00B6CC',
    contrastText: '#fff'
  },
  success: {
    light: '#42CE80',
    main: '#28C76F',
    dark: '#23AF62',
    contrastText: '#fff'
  },
  card: {
    main: "rgb(255,255,255)",
  },
};

export const lightThemeOptions = {
  components: {
    MuiButton: {
      variants: [
        {
          props: {
            variant: "primary",
          },
          style: {
            backgroundColor: colors.background.main,
            color: colors.primary.main,
            boxShadow: "0px 4px 18px 0px rgba(47, 43, 61, 0.1)",
            "&:hover": {
              backgroundColor: colors.background.hover,
              boxShadow: "none",
            },
          },
        },
        {
          props: {
            variant: "error",
          },
          style: {
            backgroundColor: colors.background.main,
            color: colors.primary.main,
            "&:hover": {
              backgroundColor: colors.background.paper,
            },
          },
        },
      ],
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          ":hover": {
            transform: "scale(1.1)",
            transition: "150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          },
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          "&.MuiTableHead-root ": {
            backgroundColor: colors.inactive.main,
          },
          ".MuiTableCell-root.MuiTableCell-head": {
            color: colors.darkGray.main,
            textTransform: "capitalize",
          },
          ".MuiTableCell-root.MuiTableCell-head:first-of-type": {
            borderRadius: "10px 0 0 10px",
          },
          ".MuiTableCell-root.MuiTableCell-head:last-of-type": {
            borderRadius: "0 10px 10px 0",
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          ".MuiTableCell-root.MuiTableCell-body": {
            color: colors.text.main,
            borderBottom: "none",
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: neutral[500],
          color: "#FFFFFF",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: colors.darkGray.main,
        },
      },
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: {
          "&.MuiFormHelperText-root": {
            color: colors.primary.main,
            marginLeft: "0",
          },
          "&.MuiFormHelperText-root.Mui-error": {
            color: colors.error.main,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          "&::placeholder": {
            opacity: 1,
            color: colors.text.secondary,
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderColor: divider,
          borderStyle: "solid",
          borderWidth: 1,
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderColor: divider,
          borderStyle: "solid",
          borderWidth: 1,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: neutral[500],
        },
        track: {
          backgroundColor: neutral[400],
          opacity: 1,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          textAlign: "center",
          borderBottom: `1px solid ${divider}`,
        },
      },
    },

    MuiButtonBase: {
      styleOverrides: {
        root: {
          backgroundColor: colors.background.hover,
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        root: {
          ".MuiDialog-container .MuiPaper-root": {
            backgroundColor: colors.background.main,
            borderRadius: 8,
            width: "35%", // this one will be deleted in the end
            zIndex: "1200",
          },
        },
      },
    },
  },

  palette: {
    mode: "light",
    ...colors,
  },
  typography: {
    ...typography,
  },
};


const colors = {
  background: {
    main: "#444545",
    paper: "#323434",
  },
  extrenal: {
    main: "#3D3E3E",
  },
  main: "#FFF8F0",
  origin: {
    main: "#FFBF69",
  },
  edit: {
    main: "#FFF8F0",
  },
  text: {
    main: "#FFF8F0",
  },
  inactive: {
    main: "#3D3E3E",
  },
  darkGray: {
    main: "#718483",
  },
  lightGray: {
    main: "#A7B4B3",
  },
  primary: {
    light: '#2EC4B6',
    dark: '#FF9F1C',
    main: '#D36135',
    contrastText: '#fff'
  },
  secondary: {
    light: '#CBF3F0',
    main: '#A8AAAE',
    dark: '#949699',
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
    main: "#323434",
  },
  grey: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
    A100: '#F5F5F5',
    A200: '#EEEEEE',
    A400: '#BDBDBD',
    A700: '#616161'
  },
};

export const typography = {
  fontFamily: [
    'Public Sans',
    'sans-serif',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"'
  ].join(','),
  fontSize: 13.125,
  
  inputTitle: {
    color: colors.text.main,
  },
}

export const darkThemeOptions = {
  components: {
    MuiPagination: {
      styleOverrides: {
        root: {
          "& .MuiPaginationItem-root": {
            "&:hover": {
              backgroundColor: colors.background.hover,
              transition: "250ms",
            },
            color: colors.text.main,
            backgroundColor: "inherit",
            "&.Mui-selected ": {
              color: "'#fff'f",
              backgroundColor: colors.background.main,
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: colors.text.main,
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          color: colors.primary.main,
          ":hover": {
            backgroundColor: colors.extrenal.main,
            color: colors.origin.paper,
            transform: "scale(1.0.8)",
            transition: "200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
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
            color: colors.text.main,
            textTransform: "capitalize",
          },
          ".MuiTableCell-root.MuiTableCell-head:first-of-type": {
            borderRadius: "10px",
          },
          ".MuiTableCell-root.MuiTableCell-head:last-of-type": {
            borderRadius: "10px",
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-root.MuiTableCell-body": {
            color: colors.text.main,
            ...typography.body2,
            borderBottom: "none",
          },
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(189, 200, 240,0.2)",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          textAlign: "center",
        },
      },
    },
  },

  palette: {
    mode: "dark",
    ...colors,
  },
  typography: {
    ...typography,
  },
};

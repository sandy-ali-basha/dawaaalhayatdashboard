export const baseThemeOptions = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1000,
      lg: 1200,
      xl: 1920,
    },
  },

  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: 0,
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
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  
  
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: "h6",
        },
        subheaderTypographyProps: {
          variant: "body2",
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        color: "primary",
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
  
    MuiIconButton: {
      styleOverrides: {
        root: {
          marginLeft: 2,
          marginRight: 2,
          borderRadius: 8,
          padding: 8,
        },
        sizeSmall: {
          padding: 4,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          overflow: "hidden",
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: "hover",
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          marginRight: "16px",
          "&.MuiListItemIcon-root": {
            minWidth: "unset",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          fontWeight: 500,
        },
      },
    },
    MuiRadio: {
      defaultProps: {
        color: "primary",
      },
    },
    MuiSwitch: {
      defaultProps: {
        color: "primary",
      },
    },
   
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-root": {
            fontWeight: 600,
            textTransform: "uppercase",
          },
          "& .MuiTableCell-paddingCheckbox": {
            paddingTop: 4,
            paddingBottom: 4,
          },
        },
      },
    },
  },
  direction: "ltr",
  
  typography: {
  fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
};


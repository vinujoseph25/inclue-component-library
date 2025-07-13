import { Theme, Components } from '@mui/material/styles';
import { alpha } from './utils';

/**
 * Global component customizations that can be applied to any theme
 */
export const getComponentCustomizations = (theme: Theme): Components => ({
  // Button customizations
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        fontWeight: 500,
        borderRadius: theme.shape.borderRadius,
        padding: '8px 16px',
        transition: theme.transitions.create([
          'background-color',
          'box-shadow',
          'border-color',
          'color',
        ]),
        '&:focus-visible': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: 2,
        },
      },
      contained: {
        boxShadow: theme.shadows[2],
        '&:hover': {
          boxShadow: theme.shadows[4],
        },
        '&:active': {
          boxShadow: theme.shadows[1],
        },
      },
      outlined: {
        borderWidth: 2,
        '&:hover': {
          borderWidth: 2,
          backgroundColor: alpha(theme.palette.primary.main, 0.04),
        },
      },
      sizeSmall: {
        padding: '6px 12px',
        fontSize: '0.8125rem',
      },
      sizeLarge: {
        padding: '12px 24px',
        fontSize: '0.9375rem',
      },
    },
  },

  // TextField customizations
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: theme.shape.borderRadius,
          transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
          },
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderWidth: 2,
            },
          },
        },
        '& .MuiInputLabel-root': {
          fontWeight: 500,
        },
        '& .MuiFormHelperText-root': {
          marginTop: theme.spacing(1),
        },
      },
    },
  },

  // Card customizations
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius:
          typeof theme.shape.borderRadius === 'number'
            ? theme.shape.borderRadius * 2
            : `calc(${theme.shape.borderRadius} * 2)`,
        boxShadow: theme.shadows[1],
        transition: theme.transitions.create(['box-shadow', 'transform']),
        '&:hover': {
          boxShadow: theme.shadows[4],
        },
      },
    },
  },

  // Paper customizations
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: theme.shape.borderRadius,
      },
      rounded: {
        borderRadius:
          typeof theme.shape.borderRadius === 'number'
            ? theme.shape.borderRadius * 2
            : `calc(${theme.shape.borderRadius} * 2)`,
      },
      elevation1: {
        boxShadow: theme.shadows[1],
      },
      elevation2: {
        boxShadow: theme.shadows[2],
      },
      elevation3: {
        boxShadow: theme.shadows[3],
      },
    },
  },

  // Dialog customizations
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius:
          typeof theme.shape.borderRadius === 'number'
            ? theme.shape.borderRadius * 3
            : `calc(${theme.shape.borderRadius} * 3)`,
        margin: theme.spacing(2),
      },
    },
  },

  // Chip customizations
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius:
          typeof theme.shape.borderRadius === 'number'
            ? theme.shape.borderRadius * 4
            : `calc(${theme.shape.borderRadius} * 4)`,
        fontWeight: 500,
      },
      deleteIcon: {
        fontSize: '1.125rem',
        '&:hover': {
          color: theme.palette.error.main,
        },
      },
    },
  },

  // AppBar customizations
  MuiAppBar: {
    styleOverrides: {
      root: {
        boxShadow: theme.shadows[2],
      },
    },
  },

  // Drawer customizations
  MuiDrawer: {
    styleOverrides: {
      paper: {
        borderRadius: 0,
        borderRight: theme.palette.mode === 'light' ? `1px solid ${theme.palette.divider}` : 'none',
      },
    },
  },

  // List customizations
  MuiListItem: {
    styleOverrides: {
      root: {
        borderRadius: theme.shape.borderRadius,
        marginBottom: theme.spacing(0.5),
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.04),
        },
        '&.Mui-selected': {
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.12),
          },
        },
      },
    },
  },

  // Tab customizations
  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        fontWeight: 500,
        fontSize: '0.9375rem',
        minHeight: 48,
        '&:focus-visible': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: -2,
        },
      },
    },
  },

  // Switch customizations
  MuiSwitch: {
    styleOverrides: {
      root: {
        width: 58,
        height: 38,
        padding: 7,
      },
      switchBase: {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
          transform: 'translateX(22px)',
        },
      },
      thumb: {
        boxShadow: theme.shadows[1],
        width: 32,
        height: 32,
      },
      track: {
        borderRadius: 38 / 2,
        opacity: 1,
        backgroundColor:
          theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
      },
    },
  },

  // Checkbox customizations
  MuiCheckbox: {
    styleOverrides: {
      root: {
        borderRadius:
          typeof theme.shape.borderRadius === 'number'
            ? theme.shape.borderRadius / 2
            : `calc(${theme.shape.borderRadius} / 2)`,
        '&:focus-visible': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: 2,
        },
      },
    },
  },

  // Radio customizations
  MuiRadio: {
    styleOverrides: {
      root: {
        '&:focus-visible': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: 2,
        },
      },
    },
  },

  // Tooltip customizations
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        borderRadius: theme.shape.borderRadius,
        fontSize: '0.75rem',
        fontWeight: 500,
        padding: `${theme.spacing(1)} ${theme.spacing(1.5)}`,
      },
    },
  },

  // Snackbar customizations
  MuiSnackbar: {
    styleOverrides: {
      root: {
        '& .MuiSnackbarContent-root': {
          borderRadius:
            typeof theme.shape.borderRadius === 'number'
              ? theme.shape.borderRadius * 2
              : `calc(${theme.shape.borderRadius} * 2)`,
          fontWeight: 500,
        },
      },
    },
  },

  // Alert customizations
  MuiAlert: {
    styleOverrides: {
      root: {
        borderRadius:
          typeof theme.shape.borderRadius === 'number'
            ? theme.shape.borderRadius * 2
            : `calc(${theme.shape.borderRadius} * 2)`,
        fontWeight: 500,
      },
      standardSuccess: {
        backgroundColor: alpha(theme.palette.success.main, 0.1),
        color: theme.palette.success.dark,
      },
      standardError: {
        backgroundColor: alpha(theme.palette.error.main, 0.1),
        color: theme.palette.error.dark,
      },
      standardWarning: {
        backgroundColor: alpha(theme.palette.warning.main, 0.1),
        color: theme.palette.warning.dark,
      },
      standardInfo: {
        backgroundColor: alpha(theme.palette.info.main, 0.1),
        color: theme.palette.info.dark,
      },
    },
  },
});

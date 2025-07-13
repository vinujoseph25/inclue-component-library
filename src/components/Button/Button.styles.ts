import { styled } from '@mui/material/styles';
import { Button as MuiButton } from '@mui/material';
import { ButtonProps } from './Button.types';

export const StyledButton = styled(MuiButton)<{
  $variant: ButtonProps['variant'];
  $loading: boolean;
}>(({ theme, $variant, $loading }) => ({
  position: 'relative',
  textTransform: 'none',
  fontWeight: 500,
  borderRadius: theme.spacing(1),
  transition: theme.transitions.create(
    ['background-color', 'box-shadow', 'border-color', 'color'],
    {
      duration: theme.transitions.duration.short,
    }
  ),

  // Loading state styles
  ...($loading && {
    pointerEvents: 'none',
    '& .MuiButton-startIcon, & .MuiButton-endIcon': {
      opacity: 0,
    },
  }),

  // Variant-specific styles
  ...($variant === 'primary' && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      boxShadow: theme.shadows[4],
    },
    '&:active': {
      backgroundColor: theme.palette.primary.dark,
      boxShadow: theme.shadows[2],
    },
  }),

  ...($variant === 'secondary' && {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
      boxShadow: theme.shadows[4],
    },
    '&:active': {
      backgroundColor: theme.palette.secondary.dark,
      boxShadow: theme.shadows[2],
    },
  }),

  ...($variant === 'outlined' && {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      borderColor: theme.palette.primary.main,
    },
  }),

  ...($variant === 'text' && {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  }),

  ...($variant === 'danger' && {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
      boxShadow: theme.shadows[4],
    },
    '&:active': {
      backgroundColor: theme.palette.error.dark,
      boxShadow: theme.shadows[2],
    },
  }),

  // Disabled state
  '&:disabled': {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
    boxShadow: 'none',
    borderColor: 'transparent',
  },
}));

export const LoadingSpinner = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 16,
  height: 16,
  border: `2px solid ${theme.palette.common.white}`,
  borderTop: '2px solid transparent',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',

  '@keyframes spin': {
    '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
    '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
  },
}));

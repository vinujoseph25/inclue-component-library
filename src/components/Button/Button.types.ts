import { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'text' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'size' | 'color'> {
  /**
   * The variant of the button
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * The size of the button
   * @default 'medium'
   */
  size?: ButtonSize;

  /**
   * Button label text
   */
  label?: string;

  /**
   * Loading state of the button
   * @default false
   */
  loading?: boolean;

  /**
   * Icon to display before the label
   */
  startIcon?: ReactNode;

  /**
   * Icon to display after the label
   */
  endIcon?: ReactNode;

  /**
   * Makes the button take full width of its container
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Custom labels for localization override
   */
  labels?: {
    loading?: string;
  };

  /**
   * Button content
   */
  children?: ReactNode;
}

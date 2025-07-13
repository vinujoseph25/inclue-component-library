import React, { forwardRef } from 'react';
import { ButtonProps } from './Button.types';
import { StyledButton, LoadingSpinner } from './Button.styles';
import { useComponentTranslation } from '../../utils/i18n';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      loading = false,
      disabled = false,
      label,
      children,
      startIcon,
      endIcon,
      fullWidth = false,
      labels,
      ...props
    },
    ref
  ) => {
    const { t } = useComponentTranslation('button');

    // Get the appropriate MUI variant
    const getMuiVariant = () => {
      switch (variant) {
        case 'outlined':
          return 'outlined';
        case 'text':
          return 'text';
        default:
          return 'contained';
      }
    };

    // Get the appropriate MUI color
    const getMuiColor = () => {
      switch (variant) {
        case 'secondary':
          return 'secondary';
        case 'danger':
          return 'error';
        default:
          return 'primary';
      }
    };

    // Determine button content
    const buttonContent = children || label || t('default', 'Button');
    const loadingText = labels?.loading || t('loading', 'Loading...');

    return (
      <StyledButton
        ref={ref}
        variant={getMuiVariant()}
        color={getMuiColor()}
        size={size}
        disabled={disabled || loading}
        fullWidth={fullWidth}
        startIcon={!loading ? startIcon : undefined}
        endIcon={!loading ? endIcon : undefined}
        $variant={variant}
        $loading={loading}
        {...props}
      >
        {loading ? (
          <>
            <LoadingSpinner />
            <span style={{ opacity: 0 }}>{buttonContent}</span>
          </>
        ) : (
          buttonContent
        )}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';

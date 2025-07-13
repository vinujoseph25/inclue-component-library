import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button } from './Button';
import { ThemeProvider } from '../../providers/ThemeProvider';
import { LocalizationProvider } from '../../providers/LocalizationProvider';
import enTranslations from '../../locales/en.json';

// Decorators for consistent theming and localization
const withProviders = (Story: any) => (
  <ThemeProvider>
    <LocalizationProvider config={{ locale: 'en', messages: enTranslations }}>
      <Story />
    </LocalizationProvider>
  </ThemeProvider>
);

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  decorators: [withProviders],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The Button component is a customizable button based on Material-UI with additional features like loading states, multiple variants, and localization support.

## Features
- Multiple variants (primary, secondary, outlined, text, danger)
- Loading states with spinner
- Icon support (start and end icons)
- Full width option
- Size variants (small, medium, large)
- Localization support
- Accessibility compliant
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outlined', 'text', 'danger'],
      description: 'The variant of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the button',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Shows loading spinner and disables the button',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the button',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Makes the button take full width of its container',
    },
    onClick: {
      action: 'clicked',
      description: 'Callback fired when the button is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic stories
export const Primary: Story = {
  args: {
    label: 'Primary Button',
    variant: 'primary',
    onClick: action('primary-clicked'),
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    variant: 'secondary',
    onClick: action('secondary-clicked'),
  },
};

export const Outlined: Story = {
  args: {
    label: 'Outlined Button',
    variant: 'outlined',
    onClick: action('outlined-clicked'),
  },
};

export const Text: Story = {
  args: {
    label: 'Text Button',
    variant: 'text',
    onClick: action('text-clicked'),
  },
};

export const Danger: Story = {
  args: {
    label: 'Danger Button',
    variant: 'danger',
    onClick: action('danger-clicked'),
  },
};

// Size variants
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button label="Small" size="small" onClick={action('small-clicked')} />
      <Button label="Medium" size="medium" onClick={action('medium-clicked')} />
      <Button label="Large" size="large" onClick={action('large-clicked')} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different size variants of the button.',
      },
    },
  },
};

// States
export const Loading: Story = {
  args: {
    label: 'Loading Button',
    loading: true,
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button in loading state with spinner.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    disabled: true,
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button in disabled state.',
      },
    },
  },
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
      <Button label="Download" startIcon={<span>⬇</span>} onClick={action('download-clicked')} />
      <Button label="Next" endIcon={<span>→</span>} onClick={action('next-clicked')} />
      <Button
        label="Save & Continue"
        startIcon={<span>💾</span>}
        endIcon={<span>→</span>}
        onClick={action('save-continue-clicked')}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with start and end icons.',
      },
    },
  },
};

// Full width
export const FullWidth: Story = {
  args: {
    label: 'Full Width Button',
    fullWidth: true,
    variant: 'primary',
    onClick: action('fullwidth-clicked'),
  },
  decorators: [
    Story => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
    withProviders,
  ],
  parameters: {
    docs: {
      description: {
        story: 'Button that takes the full width of its container.',
      },
    },
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button label="Primary" variant="primary" onClick={action('primary')} />
      <Button label="Secondary" variant="secondary" onClick={action('secondary')} />
      <Button label="Outlined" variant="outlined" onClick={action('outlined')} />
      <Button label="Text" variant="text" onClick={action('text')} />
      <Button label="Danger" variant="danger" onClick={action('danger')} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button variants.',
      },
    },
  },
};

// Interactive example
export const Interactive: Story = {
  args: {
    label: 'Click me!',
    variant: 'primary',
    size: 'medium',
    loading: false,
    disabled: false,
    fullWidth: false,
    onClick: action('interactive-clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive button where you can test different props.',
      },
    },
  },
};

// Custom content
export const CustomContent: Story = {
  render: () => (
    <Button onClick={action('custom-clicked')}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>🚀</span>
        <span>Launch App</span>
        <span
          style={{
            background: 'rgba(255,255,255,0.2)',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '12px',
          }}
        >
          NEW
        </span>
      </span>
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button with custom JSX content instead of just text.',
      },
    },
  },
};

// Loading states for different variants
export const LoadingStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button label="Primary Loading" variant="primary" loading />
      <Button label="Secondary Loading" variant="secondary" loading />
      <Button label="Outlined Loading" variant="outlined" loading />
      <Button label="Danger Loading" variant="danger" loading />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Loading states for different button variants.',
      },
    },
  },
};

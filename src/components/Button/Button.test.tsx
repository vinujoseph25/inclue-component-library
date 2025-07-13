import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../test-utils';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Button label="Test Button" />);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('renders with children', () => {
    render(<Button>Child Content</Button>);
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('prefers children over label', () => {
    render(<Button label="Label">Children</Button>);
    expect(screen.getByText('Children')).toBeInTheDocument();
    expect(screen.queryByText('Label')).not.toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<Button label="Disabled" disabled onClick={handleClick} />);

    fireEvent.click(screen.getByText('Disabled'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('shows loading state', () => {
    render(<Button label="Submit" loading />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('does not call onClick when loading', () => {
    const handleClick = jest.fn();
    render(<Button label="Loading" loading onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders with custom loading text', () => {
    render(<Button label="Submit" loading labels={{ loading: 'Processing...' }} />);
    expect(screen.getByText('Processing...')).toBeInTheDocument();
  });

  it('renders different variants', () => {
    const { rerender } = render(<Button variant="primary" label="Primary" />);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-contained');

    rerender(<Button variant="outlined" label="Outlined" />);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-outlined');

    rerender(<Button variant="text" label="Text" />);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-text');
  });

  it('renders different sizes', () => {
    const { rerender } = render(<Button size="small" label="Small" />);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-sizeSmall');

    rerender(<Button size="medium" label="Medium" />);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-sizeMedium');

    rerender(<Button size="large" label="Large" />);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-sizeLarge');
  });

  it('renders with start and end icons', () => {
    const StartIcon = () => <span data-testid="start-icon">→</span>;
    const EndIcon = () => <span data-testid="end-icon">←</span>;

    render(<Button label="With Icons" startIcon={<StartIcon />} endIcon={<EndIcon />} />);

    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  });

  it('hides icons when loading', () => {
    const StartIcon = () => <span data-testid="start-icon">→</span>;
    const EndIcon = () => <span data-testid="end-icon">←</span>;

    render(<Button label="Loading" loading startIcon={<StartIcon />} endIcon={<EndIcon />} />);

    expect(screen.queryByTestId('start-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('end-icon')).not.toBeInTheDocument();
  });

  it('renders fullWidth', () => {
    render(<Button label="Full Width" fullWidth />);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-fullWidth');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref} label="Ref Test" />);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current?.tagName).toBe('BUTTON');
  });

  it('passes additional props to underlying button', () => {
    render(<Button label="Test" data-testid="custom-button" aria-label="Custom aria label" />);

    const button = screen.getByTestId('custom-button');
    expect(button).toHaveAttribute('aria-label', 'Custom aria label');
  });

  it('handles keyboard events', () => {
    const handleClick = jest.fn();
    render(<Button label="Keyboard Test" onClick={handleClick} />);

    const button = screen.getByRole('button');
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

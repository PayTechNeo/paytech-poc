import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Button, BUTTON_VARIANTS } from '../index';

describe('Button Component', () => {
  const defaultProps = {
    children: 'Test Button',
  };

  it('renders with default props', () => {
    const { getByRole } = render(<Button {...defaultProps} />);
    const button = getByRole('button', { name: 'Test Button' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-indigo-600');
  });

  it('renders with different variants', () => {
    const { rerender, getByRole } = render(<Button {...defaultProps} variant={BUTTON_VARIANTS.OUTLINED} />);
    let button = getByRole('button');
    expect(button).toHaveClass('border-indigo-600');

    rerender(<Button {...defaultProps} variant={BUTTON_VARIANTS.TEXT} />);
    button = getByRole('button');
    expect(button).toHaveClass('text-indigo-600');

    rerender(<Button {...defaultProps} variant={BUTTON_VARIANTS.CONTAINED_GRAY} />);
    button = getByRole('button');
    expect(button).toHaveClass('bg-gray-200');
  });

  it('calls onClickCb when clicked', async () => {
    const mockOnClick = jest.fn();
    const { getByRole } = render(<Button {...defaultProps} onClickCb={mockOnClick} />);
    
    const button = getByRole('button');
    await userEvent.click(button);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('calls onMouseOverCb and onMouseLeaveCb', async () => {
    const mockOnMouseOver = jest.fn();
    const mockOnMouseLeave = jest.fn();
    
    const { getByRole } = render(
      <Button 
        {...defaultProps} 
        onMouseOverCb={mockOnMouseOver}
        onMouseLeaveCb={mockOnMouseLeave}
      />
    );
    
    const button = getByRole('button');
    await userEvent.hover(button);
    await userEvent.unhover(button);
    
    expect(mockOnMouseOver).toHaveBeenCalledTimes(1);
    expect(mockOnMouseLeave).toHaveBeenCalledTimes(1);
  });

  it('applies disabled state correctly', () => {
    const { getByRole } = render(<Button {...defaultProps} disabled />);
    const button = getByRole('button');
    
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50', 'cursor-not-allowed');
  });

  it('applies custom className', () => {
    const { getByRole } = render(<Button {...defaultProps} className="custom-class" />);
    const button = getByRole('button');
    
    expect(button).toHaveClass('custom-class');
  });

  it('renders with title attribute', () => {
    const { getByRole } = render(<Button {...defaultProps} title="Button tooltip" />);
    const button = getByRole('button');
    
    expect(button).toHaveAttribute('title', 'Button tooltip');
  });

  it('renders with custom style', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByRole } = render(<Button {...defaultProps} style={customStyle} />);
    const button = getByRole('button');
    
    expect(button).toHaveStyle('background-color: red');
  });

  it('renders with different button types', () => {
    const { rerender, getByRole } = render(<Button {...defaultProps} type="submit" />);
    let button = getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');

    rerender(<Button {...defaultProps} type="reset" />);
    button = getByRole('button');
    expect(button).toHaveAttribute('type', 'reset');
  });

  it('spreads additional props', () => {
    const { getByTestId } = render(<Button {...defaultProps} data-testid="custom-button" />);
    const button = getByTestId('custom-button');
    
    expect(button).toBeInTheDocument();
  });
}); 
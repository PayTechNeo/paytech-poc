import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Checkbox from '../Checkbox';

describe('Checkbox Component', () => {
  const defaultProps = {
    'data-testid': 'test-checkbox',
  };

  it('renders with default props', () => {
    const { getByTestId } = render(<Checkbox {...defaultProps} />);
    const checkbox = getByTestId('test-checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('type', 'checkbox');
  });

  it('renders with label', () => {
    const { getByText, getByLabelText } = render(
      <Checkbox {...defaultProps} label="Test Label" />
    );
    
    expect(getByText('Test Label')).toBeInTheDocument();
    expect(getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('renders checked state', () => {
    const { getByTestId } = render(<Checkbox {...defaultProps} checked />);
    const checkbox = getByTestId('test-checkbox');
    
    expect(checkbox).toBeChecked();
  });

  it('calls onChangeCb when clicked', async () => {
    const mockOnChange = jest.fn();
    const { getByTestId } = render(
      <Checkbox {...defaultProps} onChangeCb={mockOnChange} />
    );
    
    const checkbox = getByTestId('test-checkbox');
    await userEvent.click(checkbox);
    
    expect(mockOnChange).toHaveBeenCalledWith(true);
  });

  it('applies disabled state', () => {
    const { getByTestId } = render(<Checkbox {...defaultProps} disabled />);
    const checkbox = getByTestId('test-checkbox');
    
    expect(checkbox).toBeDisabled();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Checkbox {...defaultProps} className="custom-checkbox-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-checkbox-class');
  });

  it('spreads additional props', () => {
    const { getByTestId } = render(
      <Checkbox 
        {...defaultProps} 
        name="test-name"
        id="test-id"
        value="test-value"
      />
    );
    const checkbox = getByTestId('test-checkbox');
    
    expect(checkbox).toHaveAttribute('name', 'test-name');
    expect(checkbox).toHaveAttribute('id', 'test-id');
    expect(checkbox).toHaveAttribute('value', 'test-value');
  });

  it('handles unchecked to checked transition', async () => {
    const mockOnChange = jest.fn();
    const { getByTestId } = render(
      <Checkbox {...defaultProps} onChangeCb={mockOnChange} />
    );
    
    const checkbox = getByTestId('test-checkbox');
    expect(checkbox).not.toBeChecked();
    
    await userEvent.click(checkbox);
    expect(mockOnChange).toHaveBeenCalledWith(true);
  });

  it('handles checked to unchecked transition', async () => {
    const mockOnChange = jest.fn();
    const { getByTestId } = render(
      <Checkbox {...defaultProps} checked onChangeCb={mockOnChange} />
    );
    
    const checkbox = getByTestId('test-checkbox');
    expect(checkbox).toBeChecked();
    
    await userEvent.click(checkbox);
    expect(mockOnChange).toHaveBeenCalledWith(false);
  });

  it('does not call onChangeCb when disabled', async () => {
    const mockOnChange = jest.fn();
    const { getByTestId } = render(
      <Checkbox {...defaultProps} disabled onChangeCb={mockOnChange} />
    );
    
    const checkbox = getByTestId('test-checkbox');
    await userEvent.click(checkbox);
    
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('renders without label', () => {
    const { getByTestId, queryByText } = render(<Checkbox {...defaultProps} />);
    const checkbox = getByTestId('test-checkbox');
    
    expect(checkbox).toBeInTheDocument();
    expect(queryByText('Test Label')).not.toBeInTheDocument();
  });

  it('applies default styling classes', () => {
    const { getByTestId } = render(<Checkbox {...defaultProps} />);
    const checkbox = getByTestId('test-checkbox');
    
    expect(checkbox).toHaveClass('h-4', 'w-4', 'text-indigo-600', 'focus:ring-indigo-500', 'border-gray-300', 'rounded');
  });
}); 
import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Input from '../Input';

describe('Input Component', () => {
  const defaultProps = {
    name: 'test-input',
  };

  it('renders with default props', () => {
    const { getByRole } = render(<Input {...defaultProps} />);
    const input = getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('name', 'test-input');
  });

  it('renders with label', () => {
    const { getByText, getByLabelText } = render(
      <Input {...defaultProps} label="Test Label" />
    );
    
    expect(getByText('Test Label')).toBeInTheDocument();
    expect(getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    const { getByPlaceholderText } = render(
      <Input {...defaultProps} placeholder="Enter text here" />
    );
    
    expect(getByPlaceholderText('Enter text here')).toBeInTheDocument();
  });

  it('renders with value', () => {
    const { getByDisplayValue } = render(
      <Input {...defaultProps} value="test value" />
    );
    
    expect(getByDisplayValue('test value')).toBeInTheDocument();
  });

  it('calls onChange when input changes', async () => {
    const mockOnChange = jest.fn();
    const { getByRole } = render(
      <Input {...defaultProps} onChange={mockOnChange} />
    );
    
    const input = getByRole('textbox');
    await userEvent.type(input, 'test');
    
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('calls onFocus and onBlur', async () => {
    const mockOnFocus = jest.fn();
    const mockOnBlur = jest.fn();
    
    const { getByRole } = render(
      <Input 
        {...defaultProps} 
        onFocus={mockOnFocus}
        onBlur={mockOnBlur}
      />
    );
    
    const input = getByRole('textbox');
    await userEvent.click(input);
    await userEvent.tab();
    
    expect(mockOnFocus).toHaveBeenCalled();
    expect(mockOnBlur).toHaveBeenCalled();
  });

  it('renders with start icon', () => {
    const startIcon = <span data-testid="start-icon">🔍</span>;
    const { getByTestId } = render(
      <Input {...defaultProps} startIcon={startIcon} />
    );
    
    expect(getByTestId('start-icon')).toBeInTheDocument();
  });

  it('renders with end icon', () => {
    const endIcon = <span data-testid="end-icon">✓</span>;
    const { getByTestId } = render(
      <Input {...defaultProps} endIcon={endIcon} />
    );
    
    expect(getByTestId('end-icon')).toBeInTheDocument();
  });

  it('applies disabled state', () => {
    const { getByRole } = render(<Input {...defaultProps} disabled />);
    const input = getByRole('textbox');
    
    expect(input).toBeDisabled();
  });

  it('renders with different input types', () => {
    const { rerender, getByRole } = render(<Input {...defaultProps} type="email" />);
    let input = getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');

    rerender(<Input {...defaultProps} type="password" />);
    input = getByRole('textbox');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('renders with autoComplete attribute', () => {
    const { getByRole } = render(
      <Input {...defaultProps} autoComplete="off" />
    );
    const input = getByRole('textbox');
    
    expect(input).toHaveAttribute('autocomplete', 'off');
  });

  it('renders with custom classes', () => {
    const { container } = render(
      <Input {...defaultProps} customClasses="custom-input-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-input-class');
  });

  it('renders with required asterisk', () => {
    const { getByText } = render(
      <Input {...defaultProps} label="Test Label" isRequired />
    );
    
    expect(getByText('*')).toBeInTheDocument();
  });

  it('renders with error message', () => {
    const { getByText } = render(
      <Input {...defaultProps} error="This field is required" />
    );
    
    expect(getByText('This field is required')).toBeInTheDocument();
  });

  it('applies error styling when error is present', () => {
    const { getByRole } = render(
      <Input {...defaultProps} error="Error message" />
    );
    const input = getByRole('textbox');
    
    expect(input).toHaveClass('border-red-300');
  });

  it('renders with id attribute', () => {
    const { getByRole } = render(
      <Input {...defaultProps} id="custom-id" />
    );
    const input = getByRole('textbox');
    
    expect(input).toHaveAttribute('id', 'custom-id');
  });

  it('renders label with custom styling', () => {
    const { getByText } = render(
      <Input 
        {...defaultProps} 
        label="Test Label"
        labelColor="text-blue-600"
        labelFontSize="text-lg"
        labelfontWeight="semibold"
      />
    );
    
    const label = getByText('Test Label');
    expect(label).toBeInTheDocument();
  });
}); 
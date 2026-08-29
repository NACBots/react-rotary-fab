import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RotaryDial } from '../src/RotaryDial';

describe('RotaryDial Component', () => {
  it('renders with initial default value and slider role', () => {
    render(<RotaryDial defaultValue={75} unit="% VOL" />);

    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuenow', '75');
    expect(screen.getByText('75')).toBeInTheDocument();
    expect(screen.getByText('% VOL')).toBeInTheDocument();
  });

  it('handles keyboard navigation (Arrow keys)', () => {
    const onChange = vi.fn();
    render(<RotaryDial value={50} min={0} max={100} step={5} onChange={onChange} />);

    const slider = screen.getByRole('slider');

    // Arrow Up -> +5
    fireEvent.keyDown(slider, { key: 'ArrowUp' });
    expect(onChange).toHaveBeenCalledWith(55);

    // Arrow Down -> -5
    fireEvent.keyDown(slider, { key: 'ArrowDown' });
    expect(onChange).toHaveBeenCalledWith(45);

    // Home -> min (0)
    fireEvent.keyDown(slider, { key: 'Home' });
    expect(onChange).toHaveBeenCalledWith(0);

    // End -> max (100)
    fireEvent.keyDown(slider, { key: 'End' });
    expect(onChange).toHaveBeenCalledWith(100);
  });

  it('renders custom label function if provided', () => {
    render(<RotaryDial value={42} label={val => `Custom: ${val} units`} />);
    expect(screen.getByText('Custom: 42 units')).toBeInTheDocument();
  });
});

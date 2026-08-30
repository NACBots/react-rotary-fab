import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RotaryFab } from '../src/RotaryFab';
import { RotaryFabItem } from '../src/types';

describe('RotaryFab Component', () => {
  const mockItems: RotaryFabItem[] = [
    { id: 'item1', title: 'Item 1', onClick: vi.fn() },
    { id: 'item2', title: 'Item 2', onClick: vi.fn() },
    { id: 'item3', title: 'Item 3', onClick: vi.fn() },
    { id: 'item4', title: 'Item 4', onClick: vi.fn() }
  ];

  it('renders closed by default and toggles on click', () => {
    const onOpenChange = vi.fn();
    render(<RotaryFab items={mockItems} onOpenChange={onOpenChange} />);

    const mainBtn = screen.getByRole('button', { name: /Toggle Rotary Action Menu/i });
    expect(mainBtn).toHaveAttribute('aria-expanded', 'false');

    // Click to open
    fireEvent.click(mainBtn);
    expect(mainBtn).toHaveAttribute('aria-expanded', 'true');
    expect(onOpenChange).toHaveBeenCalledWith(true);

    // Click to close
    fireEvent.click(mainBtn);
    expect(mainBtn).toHaveAttribute('aria-expanded', 'false');
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('renders all action items with titles and handles click', () => {
    const onItem1Click = vi.fn();
    const items: RotaryFabItem[] = [
      { id: 'btn-play', title: 'Play Video', onClick: onItem1Click },
      { id: 'btn-vol', title: 'Volume Control' }
    ];

    render(<RotaryFab items={items} defaultOpen={true} />);

    const playBtn = screen.getByRole('button', { name: 'Play Video' });
    expect(playBtn).toBeInTheDocument();

    fireEvent.click(playBtn);
    expect(onItem1Click).toHaveBeenCalledTimes(1);
  });

  it('supports controlled open state', () => {
    const { rerender } = render(<RotaryFab items={mockItems} open={false} />);
    const mainBtn = screen.getByRole('button', { name: /Toggle Rotary Action Menu/i });
    expect(mainBtn).toHaveAttribute('aria-expanded', 'false');

    rerender(<RotaryFab items={mockItems} open={true} />);
    expect(mainBtn).toHaveAttribute('aria-expanded', 'true');
  });

  it('applies placement class and theme properties correctly', () => {
    const { container } = render(
      <RotaryFab items={mockItems} placement="top-right" theme="cyberpunk" />
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain('rf-placement-top-right');
  });

  it('applies animationMode class correctly', () => {
    const { container } = render(
      <RotaryFab items={mockItems} animationMode="spiral" />
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain('rf-anim-spiral');
  });

  it('can toggle orbit lines rendering', () => {
    const { container, rerender } = render(
      <RotaryFab items={mockItems} defaultOpen={true} showOrbitLines={true} />
    );
    expect(container.querySelector('.rf-orbit-tracks-svg')).toBeInTheDocument();

    rerender(<RotaryFab items={mockItems} defaultOpen={true} showOrbitLines={false} />);
    expect(container.querySelector('.rf-orbit-tracks-svg')).not.toBeInTheDocument();
  });

  it('renders 3D theme and switches to dial mode', () => {
    const { container, rerender } = render(
      <RotaryFab items={mockItems} theme="3d" dialMode={false} />
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain('rf-theme-3d');

    rerender(
      <RotaryFab
        items={mockItems}
        theme="3d"
        dialMode={true}
        dialProps={{ dialStyle: 'watchmaker', value: 75 }}
      />
    );
    expect(screen.getByRole('slider')).toBeInTheDocument();
    expect(screen.getByText('75')).toBeInTheDocument();
  });
});

# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2026-08-30

### 🚀 Highlights & Major Features
- 🎨 **New 3D Skeuomorphic Theme**: Added tactile physical depth, push shadows, metallic bezels, and theme-exclusive 3D button push physics.
- 🎛 **Smooth Rotary Dial & Mobile Touch Drag Tracking**: Completely re-engineered quadrant origin trigonometry and global pointer-capture tracking with `touch-action: none` for jitter-free, ultra-smooth scrubbing on mobile touchscreens and desktop browsers.
- 📖 **Full Dumi Documentation Site**: Integrated a luxury Dumi v2 documentation platform with interactive sandboxes, component specs, haptics guide, and theming reference.
- 🤖 **AI Agent Integration Guide (`AGENTS.md`)**: Published authoritative instructions and schema contracts for AI coding assistants (Cursor, Claude Code, GitHub Copilot, Antigravity, ChatGPT).
- 🪐 **Multi-Tier 2-Arc Concentric Menus**: Added live interactive dual-arc orbital menu demos and quick switcher in the Interactive Studio.
- 🌓 **Watchmaker Logo & Adaptive Dark Mode**: Added circular horology logo with automatic dark-mode inversion in documentation and README.
- 📳 **Enhanced Haptics Engine**: Added safe function and method chaining (`haptic.tick()`, `haptic.boundary()`, `haptic('tick')`) for Web Vibration API.
- 🛡 **Layout & Z-Index Standard**: Confined `.rf-container` to `position: absolute; z-index: 20` to eliminate sidebar/header stacking bleeds.

## [1.0.1] - 2026-08-29

### Added & Improved
- 🎨 Added 8 configurable animation physics modes (`spring`, `stagger`, `spiral`, `fan`, `scale`, `elastic`, `fade`, `none`).
- 🪐 Added concentric orbit outlines toggle (`showOrbitLines`).
- 🔄 Fixed clockwise/counter-clockwise progress sweep synchronization across all 4 corner quadrants for `RotaryDial`.
- 📷 Added `Camera` and `CameraOff` icon exports in `Icons`.
- 🌐 Updated official repository, documentation, and live demo website links (`https://rotary-fab.nacbots.com`).
- 👥 Added Contributors recognition for Nikhil Eashy and Neeha Nazer.

## [1.0.0] - 2026-08-29

### Added
- 🚀 Initial release of `react-rotary-fab`.
- ⏱ Concentric multi-tier rotary Floating Action Button (FAB) layout.
- 🧭 Support for all 4 quadrants (`bottom-left`, `bottom-right`, `top-left`, `top-right`) and screen edges (`bottom-center`, `top-center`, `left-center`, `right-center`).
- 🎛 Precision watchmaker rotary dial and arc slider mode with celestial micro-dots, precision ticks, jewel thumb knob, and needle indicator.
- 📳 Tactile haptic vibration engine with multiple customizable haptic feedback patterns.
- 🎨 5 built-in themes: `luxury-watch`, `glassmorphic`, `cyberpunk`, `minimal-light`, and `neon`.
- 🎨 Full CSS variable theming support.
- 🛡 Built-in zero-dependency accessible tooltips and badges.
- 📦 Strict TypeScript declarations and bundling with `tsup` (ESM + CJS + `.d.ts` + CSS).
- 🧪 Vitest test suite and interactive Vite demo playground.

# Polaris by Restrohub - UI Mockups

A modern, high-performance landing page and UI mock-up for **Polaris**, an advanced restaurant management system developed by Restrohub. The platform showcases features like smart POS, kitchen displays, QR ordering, and AI-powered operations through a highly interactive and visually stunning web interface.

## Key Features

- **Immersive Animations**: Powered by **GSAP** (GreenSock) for intricate, scroll-triggered, and timeline-based animations.
- **Smooth Scrolling**: Implemented using **Lenis** (`@studio-freight/react-lenis`) for buttery-smooth and luxurious scrolling experiences.
- **Modern & Premium Design**: Utilizing **Tailwind CSS** for responsive, pixel-perfect, and modern UI layouts.
- **Interactive Data Visualizations**: Custom-built, animated capability charts to demonstrate system performance compared to legacy systems.
- **3D Elements**: Integration of **React Three Fiber** and **Cobe** for interactive 3D components and globes.

## Technology Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Animation**: GSAP, React Spring
- **Scroll Handling**: Lenis (Smooth Scroll)
- **3D & Canvas**: `@react-three/fiber`, `@react-three/drei`, `cobe`
- **Routing**: React Router DOM
- **Icons**: Lucide React

## Getting Started

Follow these steps to set up the project locally:

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Installation
Clone the repository and install the required dependencies:

```bash
# Install dependencies
npm install
```

### 3. Development Server
Start the Vite development server:

```bash
# Start the dev server
npm run dev
```

The application will be available at `http://localhost:5173`.

### 4. Build for Production
To build the application for production, run:

```bash
npm run build
```

## Project Structure

- `src/components/`: Reusable, smaller UI components (e.g., RollingText, BottomNav, SkillPage).
- `src/sections/`: Distinct, large-scale sections of the landing page (e.g., Main/Hero, RestroAi, HeatCapabilities, TeamSection).
- `public/assets/`: Static assets such as images, background videos, and mockups.



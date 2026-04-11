# Name Picker - 3D Random Name Selection

A stylish and performant 3D name picker for randomly selecting names from a list. Perfect for businesses, raffles, team selections, or personal use. Built with React Three Fiber and Drei for an immersive experience with interactive 3D visualization and customizable styling.

## How to Use

> 1.  **Enter Names**: On the form page, enter names one per line (for businesses, teams, raffles, etc.)

> 2.  **Customize**: Names are persisted in the URL for easy sharing

> 3.  **Pick Name**: Click "Pick Random Name" to select a winner

> 4.  **View Reveal**: The selected name appears in immersive 3D with letter-by-letter animation

> 5.  **Interact**: Use mouse/touch to rotate, zoom, and explore the 3D scene

> 6.  **Pick Again**: Use "Pick Again from Losers" to select from remaining names

> 7.  **Share**: Copy and share the URL to show others your selection result

## Features

- **Random Selection**: Enter a list of names and randomly select one for any occasion
- **3D Visualization**: Immersive 3D reveal with extruded text, floating animations, and mood lighting
- **Share Results**: URL-based state persistence - share reveal links with others
- **Multiple Rounds**: Pick again from remaining losers for subsequent selections
- **Interactive Controls**: Rotate, zoom, and pan the 3D scene with mouse or touch
- **Customizable**: Stylized 3D environment with mood lighting and visual effects
- **Form Persistence**: Names automatically persist via query strings
- **Mobile Optimized**: Responsive design for desktop and mobile devices
- **Modern Stack**: Built with React 19, TypeScript, and Vite
- **Production Ready**: Full testing coverage, code quality tools, and Git hooks

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd name-picker
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

## Dev usage

1. Start the development server:

   ```bash
   pnpm dev
   ```

2. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

The following scripts are available:

- `pnpm dev` - Start the development server
- `pnpm build` - Build the project for production
- `pnpm preview` - Preview the production build
- `pnpm lint` - Run ESLint to check code quality
- `pnpm lint:fix` - Run ESLint and automatically fix issues
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check if code is formatted correctly
- `pnpm test` - Run Jest tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage report
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm validate` - Run lint, format check, and typecheck
- `pnpm ci` - Run validation and tests (for CI)
- `pnpm clean` - Clean build artifacts
- `pnpm commit` - Use Commitizen for conventional commits

## Development

### Prerequisites

- Node.js (version 18 or higher)
- pnpm

### Setting Up Development Environment

1. Install dependencies as above.
2. Set up pre-commit hooks:

   ```bash
   pnpm prepare
   ```

3. Start developing:

   ```bash
   pnpm dev
   ```

### Code Quality

- **Linting**: ESLint with TypeScript and React rules
- **Formatting**: Prettier with consistent style
- **Commits**: Conventional commits with Husky hooks
- **Testing**: Jest with React Testing Library

## Testing

Run tests with:

```bash
pnpm test
```

For watch mode:

```bash
pnpm test:watch
```

For coverage report:

```bash
pnpm test:coverage
```

## Technologies

- **React 19** + TypeScript
- **Vite** - Build tool
- **React Three Fiber 9.5** - React renderer for Three.js
- **Drei 10.7** - Useful helpers for React Three Fiber (Text3D, OrbitControls, Stars, Float, Sparkles, Plane)
- **React Hook Form** - Form handling
- **Redux** + Redux Saga - State management
- **Jest** + React Testing Library - Testing
- **ESLint** + Prettier - Code quality
- **Husky** + Commitlint - Git hooks

## Next steps and Ideas

- **Integration with APIs**: Integrate with external APIs for importing names (e.g., from a CSV file or Google Sheets) - or import names from zoom or teams meetings - copy and paste in the list. As part of my development, I want to build some apis myself. I also want to make it easy to import names from different sources, so users can quickly populate their name lists without manual entry.
- **Customizable Themes**: Allow users to choose from different 3D themes and styles
- **Improve randomization**: Implement more sophisticated randomization algorithms for better distribution
- **Weighted Random Selection**: Support for weighted random selection (e.g., some names have higher chances of being selected) (multiple entries for the same name with different weights)
- **increase limit of names**: currently assuming around 100 based on qs limit, but could be increased with some optimizations
- **Improve form validation and error handling**: currently basic, but could be enhanced with better feedback and edge case handling
  **Improve form UX**: I want to make it as easy and intuitive as possible to enter and manage names, so I will look into improving the form design and user experience x buttons for adding/removing names, drag and drop reordering, etc.
  **Better sanitization of names**: currently basic, but could be improved to handle edge cases and prevent potential issues with special characters or formatting
  **Handle last names**: currently just shows the last name, but could be enhanced to show full names or allow customization of how names are displayed
  **Potentially handle email addresses/teams/zoom names too**: could be useful for some use cases, but would require additional handling for privacy and formatting
- **Sound Effects**: Add celebratory sound effects during the reveal
- **Confetti Animation**: Integrate confetti or particle effects for extra celebration
- **Multiple Winners**: Option to select multiple winners at once
- **Export Results**: Allow users to export the list of winners and losers
- **Accessibility**: Improve accessibility with screen reader support and keyboard navigation
- **Mobile Optimization**: Further optimize the 3D experience for mobile devices
- **Performance Enhancements**: Optimize 3D rendering and animations for smoother performance
- **User Accounts**: Allow users to create accounts and save their name lists and results
- **Custom Animations**: Allow users to customize the animation style and speed of the reveal
- **Server-based Architecture**: Implement a server-based solution to store results and handle larger lists of names without URL limitations could also have light version that just picks a name without the 3D visualization for larger lists or more performance-sensitive use cases/not needing internet connection can run locally.

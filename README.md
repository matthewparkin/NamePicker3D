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

Future improvements could include more themes, animation styles, sound effects, and integration with external APIs for importing names. Three routes I can go down - url params for simple sharing. Local storage for saving lists and results without sharing. Server-based architecture for storing results and handling larger lists without URL limitations - could also have light version that just picks a name without the 3D visualization for larger lists or more performance-sensitive use cases/not needing internet connection can run locally. Json export of results and lists could also be useful for users to save and analyze their selection results, or to import/export between different devices or sessions if I dont want loggins and expensive server infrastructure. This is designed to be free and open source, so I want to make it as accessible and easy to use as possible for a wide range of users and use cases.

## Install

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

| Command           | Description                           |
| ----------------- | ------------------------------------- |
| `pnpm dev`        | Start dev server at localhost:5173    |
| `pnpm build`      | Build for production                  |
| `pnpm preview`    | Preview production build              |
| `pnpm test`       | Run tests                             |
| `pnpm test:watch` | Run tests in watch mode               |
| `pnpm lint`       | Lint code                             |
| `pnpm format`     | Format code                           |
| `pnpm validate`   | Run lint, format check, and typecheck |
| `pnpm ci`         | Run validation + tests                |
| `pnpm commit`     | Create conventional commit            |

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

## Extending

### Themes

Themes control the 3D scene (background, lighting, colors, reveal strategies).

- Config: `src/themes/index.ts`
- Types: `src/types/theme.ts`

Add a theme by defining it in `src/themes/index.ts` and adding to `allThemes` array.

### Animations

Animations control how names are rendered (3D text, particles, etc.). Independent from themes - mix any animation with any theme.

- Config: `src/animations/index.ts`
- Types: `src/types/animation.ts`

Add an animation by creating components in `src/components/game/` and registering in `src/animations/index.ts`.

## Testing

```bash
pnpm test           # Run tests
pnpm test:watch     # Watch mode
pnpm test:coverage  # Coverage report
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

## More ideas and next steps

- **Integration with APIs**: Integrate with external APIs for importing names (e.g., from a CSV file or Google Sheets) - or import names from zoom or teams meetings - copy and paste in the list. As part of my development, I want to build some apis myself. I also want to make it easy to import names from different sources, so users can quickly populate their name lists without manual entry.
- **Customizable Themes**: Allow users to choose from different 3D themes and styles
- **Improve randomization**: Implement more sophisticated randomization algorithms for better distribution
- **Weighted Random Selection**: Support for weighted random selection (e.g., some names have higher chances of being selected) (multiple entries for the same name with different weights)
- **increase limit of names**: currently assuming around 100 based on qs limit, but could be increased with some optimizations
- **Improve form validation and error handling**: currently basic, but could be enhanced with better feedback and edge case handling
  **Improve form UX**: I want to make it as easy and intuitive as possible to enter and manage names, so I will look into improving the form design and user experience x buttons for adding/removing names, drag and drop reordering, etc.
  business theming - maybe have some themes that are more tailored to business use cases, with more professional styling and options for handling company/team names logos, style guides fonts, colors, etc. I want to make this tool as useful as possible for businesses and teams, so I will look into adding features and themes that cater to those use cases. Maybe a json based theme system that allows users to define their own themes with custom colors, fonts, and styles could be a good way to allow for more customization without needing to hardcode specific themes into the app.
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
- **Further 3d scenes**: while the 3D stuff probably wont be the easiest for people to contribute to, I do want to add more themes and styles for the 3D reveal, so I will look into adding more variety in terms of the 3D scenes and animations that are available. Maybe some more fun and whimsical themes like a carnival or space theme could be a good way to add some extra excitement and variety to the app. Keeping more accessible design in mind for some of the themes would also be important, so I will look into adding some more simple and clean themes that focus on readability and accessibility while still providing a nice visual experience.
- **Json schema for themes and animations**: to make it easier for users to create and share their own themes and animations, I could define a json schema that allows users to specify the different properties and options for their themes and animations in a structured way. This would allow for more flexibility and customization without needing to hardcode specific themes and animations into the app, and would also make it easier for users to share their creations with others. I could also create a simple UI for creating and managing custom themes and animations based on this schema, which would make it more accessible for users who may not be comfortable working directly with json files. This is absolutely overkill for the current scope of the project, but it could be a fun way to allow for more creativity and community involvement in the future if the project gains traction and there is interest in creating custom themes and animations. Also I can rapidly see this getting out of hand and becoming a maintenance nightmare, so I would want to make sure to implement this in a way that is well-structured and easy to manage, with clear documentation and guidelines for creating themes and animations that fit within the overall design and style of the app.

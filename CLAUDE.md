# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Foodiary is a React Native mobile application built with Expo (v54) and React Native New Architecture enabled. The app includes an authentication flow with a multi-step onboarding process for collecting user profile information.

## Common Commands

```bash
# Start development server
pnpm start

# Run on specific platforms
pnpm android
pnpm ios
pnpm web

# Type checking
pnpm typecheck
```

## Architecture

### Path Aliases

The project uses TypeScript path aliases defined in `tsconfig.json`:
- `@ui/*` → `./src/ui/*` - UI components, screens, and styles
- `@app/*` → `./src/app/*` - Application logic, navigation

### Directory Structure

```
src/
├── app/           - Application-level logic
│   └── navigation/  - Navigation configuration and types
└── ui/            - User interface components
    ├── components/  - Reusable UI components
    ├── screens/     - Screen-level components
    ├── styles/      - Theme and styling utilities
    ├── assets/      - Static assets
    └── utils/       - UI-related utilities
```

### Navigation Architecture

The app uses a nested navigation structure with React Navigation:

1. **Root Navigation** (`src/app/navigation/index.tsx`):
   - Container for the entire app navigation

2. **AuthStack** (`src/app/navigation/AuthStack.tsx`):
   - Top-level stack for unauthenticated screens
   - Routes: `Greetings`, `Onboarding`
   - Type-safe navigation with `AuthStackParamList`

3. **OnboardingStack** (`src/ui/screens/Onboarding/OnboardingStack.tsx`):
   - Nested independent navigation tree within the Onboarding screen
   - Uses `NavigationIndependentTree` to isolate from parent navigation
   - Multi-step flow controlled by `OnboardingContext`
   - Routes defined in `orderedSteps` array in `src/ui/screens/Onboarding/steps.ts`:
     - Goal → Gender → BirthDate → Height → Weight → ActivityLevel → CreateAccount

**Important**: The Onboarding flow uses a context-based step controller (`OnboardingProvider`) that manages navigation programmatically via `onboardingNavigation` ref. Navigation is controlled by `nextStep()` and `previousStep()` methods, not directly by navigation props.

### Styling System

The project uses a custom styling system built on React Native's `StyleSheet`:

1. **Theme** (`src/ui/styles/theme/index.tsx`):
   - Centralized design tokens for colors, fonts, and sizes
   - Font: Host Grotesk (Regular, Medium, SemiBold)
   - Color palette: lime (primary), gray, black, support colors

2. **Variant System** (`src/ui/styles/utils/createVariants.ts`):
   - Type-safe variant API similar to class-variance-authority
   - Used for creating component variations (e.g., button variants)
   - Example in `src/ui/components/Button/styles.ts`

3. **Component Patterns**:
   - Each component folder contains `index.tsx` and `styles.ts`
   - Styles are created with `StyleSheet.create()` or `createVariants()`

### Component Structure

**Common Patterns**:
- Components follow a folder-per-component structure
- Interface names prefixed with `I` (enforced by ESLint)
- Styles are co-located in component folders
- Components use TypeScript for type safety

**Key Components**:
- `Button` - Supports variants (primary, secondary, ghost), sizes, and disabled states
- `Input` - Form input with label support
- `FormGroup` - Groups form inputs with consistent spacing
- `RadioGroup` - Radio button group for selections
- `SignInBottomSheet` - Bottom sheet with sign-in options

### Context Pattern for Multi-Step Flows

The Onboarding flow demonstrates the pattern for multi-step processes:

1. Define steps array (`orderedSteps`) matching navigation routes
2. Create context with `currentStepIndex`, `nextStep()`, `previousStep()`
3. Use navigation ref (`createNavigationContainerRef`) for programmatic navigation
4. Handle edge cases: first step goes back to parent stack, last step completes flow

## Code Style

ESLint configuration (`eslint.config.mts`) enforces:
- Single quotes, semicolons, trailing commas
- TypeScript strict mode
- Interface naming: must start with `I` (e.g., `IButtonProps`)
- No console statements (warning)
- Consistent spacing and formatting

## Platform-Specific Behavior

The app uses platform detection for conditional rendering:
- iOS: Pressable feedback via opacity
- Android: Uses `android_ripple` for touch feedback

## Expo Configuration

- New Architecture enabled (`newArchEnabled: true`)
- Edge-to-edge on Android
- Custom font plugin (`expo-font`)
- Light mode only

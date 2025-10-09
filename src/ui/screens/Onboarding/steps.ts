import type { OnboardingStackParamList } from './OnboardingStack';

export const orderedSteps: (keyof OnboardingStackParamList)[] = [
    'Goal',
    'Gender',
    'BirthDate',
    'Height',
    'Weight',
    'ActivityLevel',
    'CreateAccount',
] as const;

export const TOTAL_STEPS = orderedSteps.length;

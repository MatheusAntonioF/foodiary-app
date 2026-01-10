import { useCallback, useState, type ReactNode } from 'react';

import { orderedSteps } from '../steps';
import { onboardingNavigation } from '../OnboardingStack';

import { OnboardingContext } from '.';
import { useNavigation } from '@react-navigation/native';
import type { AuthStackNavigationProps } from '@app/navigation/AuthStack';

export function OnboardingProvider({ children }: { children: ReactNode }) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const { goBack } = useNavigation<AuthStackNavigationProps>();

    const nextStep = useCallback(() => {
        const nextStepIndex = currentStepIndex + 1;
        const nextStep = orderedSteps[nextStepIndex];

        if (!nextStep) {
            return;
        }

        onboardingNavigation.navigate(nextStep);
        setCurrentStepIndex(nextStepIndex);
    }, [currentStepIndex]);

    const previousStep = useCallback(() => {
        const previousStepIndex = currentStepIndex - 1;

        if (!onboardingNavigation.canGoBack()) {
            goBack();
            return;
        }

        onboardingNavigation.goBack();
        setCurrentStepIndex(previousStepIndex);
    }, [currentStepIndex, goBack]);

    return (
        <OnboardingContext.Provider
            value={{
                currentStepIndex,
                nextStep,
                previousStep,
            }}
        >
            {children}
        </OnboardingContext.Provider>
    );
}

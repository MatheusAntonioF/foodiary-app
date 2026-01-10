import { KeyboardAvoidingView, Platform } from 'react-native';

import { OnboardingProvider } from './context/OnboardingProvider';
import { OnboardingStack } from './OnboardingStack';
import { OnboardingHeader } from './components/OnboardingHeader';
import { theme } from '@ui/styles/theme';

export function Onboarding() {
    return (
        <OnboardingProvider>
            <KeyboardAvoidingView
                style={{ flex: 1, backgroundColor: theme.colors.white }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <OnboardingHeader />
                <OnboardingStack />
            </KeyboardAvoidingView>
        </OnboardingProvider>
    );
}

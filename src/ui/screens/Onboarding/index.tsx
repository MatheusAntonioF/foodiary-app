import { View } from 'react-native';

import { OnboardingProvider } from './context/OnboardingProvider';
import { OnboardingStack } from './OnboardingStack';
import { OnboardingHeader } from './components/OnboardingHeader';
import { theme } from '@ui/styles/theme';

export function Onboarding() {
    return (
        <OnboardingProvider>
            <View style={{ flex: 1, backgroundColor: theme.colors.white }}>
                <OnboardingHeader />
                <OnboardingStack />
            </View>
        </OnboardingProvider>
    );
}

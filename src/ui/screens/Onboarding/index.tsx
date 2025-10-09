import { View } from 'react-native';

import { AppText } from '@ui/components/AppText';

import { OnboardingProvider } from './context/OnboardingProvider';
import { OnboardingStack } from './OnboardingStack';

export function Onboarding() {
    return (
        <OnboardingProvider>
            <View style={{ flex: 1 }}>
                <AppText size="3xl" weight="semiBold">
                    Onboarding
                </AppText>
                <OnboardingStack />
            </View>
        </OnboardingProvider>
    );
}

import { KeyboardAvoidingView, Platform } from 'react-native';

import { OnboardingProvider } from './context/OnboardingProvider';
import { OnboardingStack } from './OnboardingStack';
import { OnboardingHeader } from './components/OnboardingHeader';
import { theme } from '@ui/styles/theme';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { onboardingSchema } from './schema';

export function Onboarding() {
    const form = useForm({
        resolver: zodResolver(onboardingSchema),
        defaultValues: {
            birthDate: new Date(),
            height: '',
            weight: '',
            account: {
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
            },
        },
    });

    return (
        <FormProvider {...form}>
            <OnboardingProvider>
                <KeyboardAvoidingView
                    style={{ flex: 1, backgroundColor: theme.colors.white }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <OnboardingHeader />
                    <OnboardingStack />
                </KeyboardAvoidingView>
            </OnboardingProvider>
        </FormProvider>
    );
}

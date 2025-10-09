import { View } from 'react-native';
import { AppText } from '@ui/components/AppText';
import { useOnboarding } from '../context/useOnboarding';
import { Button } from '@ui/components/Button';

export function ActivityLevelStep() {
    const { currentStepIndex, nextStep, previousStep } = useOnboarding();

    return (
        <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
            <AppText size="3xl" weight="semiBold">
                Onboarding
            </AppText>

            <View>
                <Button onPress={previousStep}>Voltar</Button>
                <AppText>{currentStepIndex}</AppText>
                <Button onPress={nextStep}>Avançar</Button>
            </View>
        </View>
    );
}

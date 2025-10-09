import { View } from 'react-native';
import { AppText } from '@ui/components/AppText';

export function BirthDateStep() {
    return (
        <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
            <AppText size="3xl" weight="semiBold">
                Onboarding
            </AppText>
        </View>
    );
}

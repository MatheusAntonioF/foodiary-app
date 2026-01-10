import { View } from 'react-native';
import { AppText } from '@ui/components/AppText';

export function WeightStep() {
    return (
        <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
            <AppText size="3xl" weight="semiBold">
                WeightStep
            </AppText>
        </View>
    );
}

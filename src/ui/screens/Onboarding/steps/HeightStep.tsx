import { View } from 'react-native';
import { AppText } from '@ui/components/AppText';

export function HeightStep() {
    return (
        <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
            <AppText size="3xl" weight="semiBold">
                HeightStep
            </AppText>
        </View>
    );
}

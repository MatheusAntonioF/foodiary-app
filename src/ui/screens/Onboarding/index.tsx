import { View } from 'react-native';

import type {
    AuthStackRouteProps,
    AuthStackScreenProps,
} from '@app/navigation/AuthStack';
import { AppText } from '@ui/components/AppText';
import { useRoute } from '@react-navigation/native';

export function Onboarding(props: AuthStackScreenProps<'Onboarding'>) {
    const router = useRoute<AuthStackRouteProps<'Onboarding'>>();

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

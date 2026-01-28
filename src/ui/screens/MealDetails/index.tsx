import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import type { AppStackRouteProps } from '@app/navigation/AppStack';

import { AppText } from '@ui/components/AppText';
import { Button } from '@ui/components/Button';

import { styles } from './styles';

export function MealDetails() {
    const { params } = useRoute<AppStackRouteProps<'MealDetails'>>();
    const { goBack } = useNavigation();
    return (
        <View style={styles.container}>
            <AppText>Meal id: {params.mealId}</AppText>
            <Button onPress={goBack}>Voltar</Button>
        </View>
    );
}

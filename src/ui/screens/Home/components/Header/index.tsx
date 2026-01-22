import { View } from 'react-native';

import { AppText } from '@ui/components/AppText';

import { styles } from './styles';
import { UserHeader } from '../UserHeader';
import { DateSwitcher } from '../DateSwitcher';
import { CurrentGoal } from '../CurrentGoal';
import { useHomeContext } from '../../context/useHomeContext';

export function Header() {
    const { isLoading } = useHomeContext();

    return (
        <View>
            <UserHeader />
            <View style={styles.container}>
                <DateSwitcher />
                <CurrentGoal />

                <View style={styles.divider} />

                <AppText
                    style={[
                        styles.mealsLabel,
                        { opacity: isLoading ? 0.5 : 1 },
                    ]}
                    weight="medium"
                >
                    REFEIÇÕES
                </AppText>
            </View>
        </View>
    );
}

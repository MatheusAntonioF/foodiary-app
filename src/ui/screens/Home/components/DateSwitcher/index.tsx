import { AppText } from '@ui/components/AppText';
import { Button } from '@ui/components/Button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react-native';
import { View } from 'react-native';
import { styles } from './styles';
import { theme } from '@ui/styles/theme';
import { useHomeContext } from '../../context/useHomeContext';

export function DateSwitcher() {
    const { previousDay, nextDay, date, isLoading } = useHomeContext();

    return (
        <View style={[styles.container, { opacity: isLoading ? 0.5 : 1 }]}>
            <Button
                size="icon"
                variant="ghost"
                onPress={previousDay}
                disabled={isLoading}
            >
                <ChevronLeftIcon />
            </Button>

            <AppText
                color={theme.colors.gray['700']}
                style={styles.selectedDate}
                weight="medium"
            >
                {formatDate(date)}
            </AppText>

            <Button
                size="icon"
                variant="ghost"
                onPress={nextDay}
                disabled={isLoading}
            >
                <ChevronRightIcon />
            </Button>
        </View>
    );
}

function formatDate(date: Date) {
    const now = new Date();
    const isToday = now.toDateString() === date.toDateString();

    const formattedDate = Intl.DateTimeFormat('pt-BR', {
        weekday: isToday ? undefined : 'long',
        day: '2-digit',
        month: 'long',
    }).format(date);

    return `${isToday ? 'Hoje, ' : ''}${formattedDate}`.toUpperCase();
}

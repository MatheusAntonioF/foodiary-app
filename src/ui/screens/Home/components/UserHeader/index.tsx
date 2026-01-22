import { Image, View } from 'react-native';
import { styles } from './styles';
import { AppText } from '@ui/components/AppText';
import { theme } from '@ui/styles/theme';
import { useAccount } from '@app/hooks/queries/useAccount';
import { TargetIcon } from 'lucide-react-native';
import { Button } from '@ui/components/Button';

export function UserHeader() {
    const { account } = useAccount();

    return (
        <View style={styles.container}>
            <View style={styles.userInfo}>
                <Image
                    style={styles.avatar}
                    source={{
                        uri: 'https://github.com/MatheusAntonioF.png',
                    }}
                />
                <View style={styles.greetings}>
                    <AppText size="sm" color={theme.colors.gray['700']}>
                        Olá, 👋
                    </AppText>
                    <AppText weight="semiBold">{account!.profile.name}</AppText>
                </View>
            </View>
            <Button variant="ghost" leftIcon={TargetIcon}>
                Metas
            </Button>
        </View>
    );
}

import { useState } from 'react';
import { Modal, StatusBar, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { theme } from '@ui/styles/theme';

import { AppText } from '../AppText';
import { Button } from '../Button';

import { styles } from './styles';
import { GoalStats } from '../GoalStats';
import { useAuth } from '@app/contexts/AuthContext/useAuth';
import { useAccount } from '@app/hooks/queries/useAccount';
import type { Goal } from '@app/types/Goal';

const goalsMap: Record<Goal, { icon: string; label: string }> = {
    LOSE: {
        icon: '🥦',
        label: 'Perder Peso',
    },
    MAINTAIN: {
        icon: '🍍',
        label: 'Manter Peso',
    },
    GAIN: {
        icon: '🥩',
        label: 'Ganhar Peso',
    },
};

export function WelcomeModal() {
    const { signedUp } = useAuth();
    const { account } = useAccount();
    const [visible, setVisible] = useState(signedUp);

    const goal = goalsMap[account!.profile.goal];

    function handleClose() {
        setVisible(false);
    }

    return (
        <Modal
            visible={visible}
            transparent
            statusBarTranslucent
            animationType="fade"
            onRequestClose={handleClose}
        >
            <StatusBar animated barStyle="light-content" />
            <View style={styles.container}>
                <SafeAreaProvider>
                    <SafeAreaView style={styles.wrapper}>
                        <View style={styles.content}>
                            <View style={styles.header}>
                                <View style={styles.icon}>
                                    <AppText>{goal.icon}</AppText>
                                </View>
                                <View style={styles.headerContent}>
                                    <AppText
                                        color={theme.colors.gray['100']}
                                        align="center"
                                        size="3xl"
                                        weight="semiBold"
                                        style={styles.title}
                                    >
                                        Seu plano de dieta para{' '}
                                        <Text style={styles.titleHighlight}>
                                            {goal.label}
                                        </Text>{' '}
                                        está pronto!
                                    </AppText>
                                    <AppText
                                        color={theme.colors.gray['600']}
                                        align="center"
                                    >
                                        Essa é uma recomendação diária
                                        recomendada para seu plano. Fique
                                        tranquilo, você poderá editar depois
                                        caso deseje.
                                    </AppText>
                                </View>
                            </View>
                            <View style={styles.body}>
                                <GoalStats
                                    calories={{ goal: account!.goal.calories }}
                                    proteins={{ goal: account!.goal.proteins }}
                                    fats={{ goal: account!.goal.fats }}
                                    carbohydrates={{
                                        goal: account!.goal.carbohydrates,
                                    }}
                                />
                            </View>
                        </View>

                        <View style={styles.footer}>
                            <Button onPress={handleClose}>
                                Começar meu plano
                            </Button>
                        </View>
                    </SafeAreaView>
                </SafeAreaProvider>
            </View>
        </Modal>
    );
}

import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';

import greetingsBg from '@ui/assets/greetings-bg/image.jpg';

import { styles } from './styles';
import { Logo } from '@ui/components/Logo';
import { Button } from '@ui/components/Button';
import { AppText } from '@ui/components/AppText';
import { theme } from '@ui/styles/theme';
import { SignInBottomSheet } from '@ui/components/SignInBottomSheet';
import type { ISignInBottomSheet } from '@ui/components/SignInBottomSheet/ISignInBottomSheet';
import type { AuthStackNavigationProps } from '@app/navigation/AuthStack';

export function Greetings() {
    const signInBottomSheetRef = useRef<ISignInBottomSheet>(null);
    const navigation = useNavigation<AuthStackNavigationProps>();

    return (
        <>
            <ImageBackground
                style={styles.container}
                source={greetingsBg}
                resizeMode="cover"
            >
                <SafeAreaView style={styles.content}>
                    <Logo />

                    <View style={styles.ctaContainer}>
                        <AppText
                            style={styles.heading}
                            color={theme.colors.white}
                            weight="semiBold"
                            size="3xl"
                        >
                            Controle sua dieta de forma simples
                        </AppText>

                        <View style={styles.ctaContent}>
                            <Button
                                onPress={() => {
                                    navigation.navigate('Onboarding');
                                }}
                            >
                                Criar minha conta
                            </Button>

                            <View style={styles.signInContainer}>
                                <AppText color={theme.colors.white}>
                                    Já tem conta?
                                </AppText>
                                <TouchableOpacity
                                    onPress={() =>
                                        signInBottomSheetRef.current?.open()
                                    }
                                >
                                    <AppText
                                        color={theme.colors.lime['500']}
                                        weight="medium"
                                    >
                                        Acesse a sua conta
                                    </AppText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </ImageBackground>
            <SignInBottomSheet ref={signInBottomSheetRef} />
        </>
    );
}

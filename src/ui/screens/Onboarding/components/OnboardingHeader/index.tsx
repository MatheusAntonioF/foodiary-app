import { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'lucide-react-native';

import { Button } from '@ui/components/Button';
import { theme } from '@ui/styles/theme';

import { styles } from './styles';
import { useOnboarding } from '../../context/useOnboarding';
import { TOTAL_STEPS } from '../../steps';

export function OnboardingHeader() {
    const { top } = useSafeAreaInsets();
    const { previousStep, currentStepIndex } = useOnboarding();

    const widthAnimationRef = useRef(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(widthAnimationRef.current, {
            toValue: ((currentStepIndex + 1) * 100) / TOTAL_STEPS,
            duration: 300, // ms
            // run the animation in the native platform
            // default to true, in this case we're passing false cause the native platform
            // does not support the type of animation we're creating: animating width
            useNativeDriver: false,
        }).start();
    }, [currentStepIndex]);

    return (
        <View style={[styles.container, { marginTop: top }]}>
            <Button variant="ghost" size="icon" onPress={previousStep}>
                <ChevronLeftIcon size={20} color={theme.colors.black[700]} />
            </Button>

            <View style={styles.progressBarBackground}>
                <Animated.View
                    style={[
                        styles.progressBarForeground,
                        {
                            width: widthAnimationRef.current.interpolate({
                                inputRange: [0, 100],
                                outputRange: ['0%', '100%'],
                            }),
                        },
                    ]}
                />
            </View>

            <View style={styles.rightActionPlaceholder}></View>
        </View>
    );
}

import { ActivityIndicator, Platform, Pressable, View } from 'react-native';

import { AppText } from '../AppText';

import { buttonStyles, styles, type ButtonVariants } from './styles';
import { theme } from '@ui/styles/theme';

interface IButtonProps
    extends
        React.ComponentProps<typeof Pressable>,
        Omit<ButtonVariants, 'disabled'> {
    isLoading?: boolean;
}

export function Button({
    children,
    variant,
    size,
    disabled: disabledProp,
    style,
    isLoading = false,
    ...props
}: IButtonProps) {
    const disabled = disabledProp || isLoading;

    const childEl =
        typeof children === 'string' ? (
            <AppText weight="medium">{children}</AppText>
        ) : (
            children
        );

    return (
        <View style={styles.wrapper}>
            <Pressable
                disabled={disabled}
                android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
                style={({ pressed }) => [
                    buttonStyles({
                        variant,
                        size,
                        disabled: disabled ? 'true' : 'false',
                    }),
                    pressed && Platform.OS === 'ios' && { opacity: 0.7 },
                    typeof style === 'function' ? style({ pressed }) : style,
                ]}
                {...props}
            >
                {isLoading ? (
                    <ActivityIndicator color={theme.colors.black['700']} />
                ) : (
                    childEl
                )}
            </Pressable>
        </View>
    );
}

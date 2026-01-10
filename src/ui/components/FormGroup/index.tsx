import { cloneElement, type ReactElement } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

import { theme } from '@ui/styles/theme';
import { AppText } from '../AppText';

import { styles } from './styles';

interface IFormGroupProps {
    label: string;
    children: ReactElement<{ error?: boolean }>;
    error?: string;
    style?: StyleProp<ViewStyle>;
}

export function FormGroup({ label, error, children, style }: IFormGroupProps) {
    return (
        <View style={[styles.container, style]}>
            <AppText weight="medium">{label}</AppText>
            {cloneElement(children, { error: !!error })}
            {error && (
                <AppText size="sm" color={theme.colors.support.red}>
                    {error}
                </AppText>
            )}
        </View>
    );
}

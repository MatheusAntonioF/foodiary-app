import { useState } from 'react';
import {
    TextInput,
    type NativeSyntheticEvent,
    type TargetedEvent,
    type TextInputProps,
} from 'react-native';
import { theme } from '@ui/styles/theme';

import { inputStyles } from './styles';

type BaseTextInputProps = Omit<TextInputProps, 'readOnly'>;

export interface IInputProps extends BaseTextInputProps {
    error?: boolean;
    disabled?: boolean;
    InputComponent?: React.ComponentType<TextInputProps>;
    ref?: React.Ref<TextInput>;
}

export function Input({
    style,
    onFocus,
    onBlur,
    error,
    disabled,
    InputComponent = TextInput,
    ...props
}: IInputProps) {
    const [isFocused, setIsFocused] = useState(false);

    function handleFocus(event: NativeSyntheticEvent<TargetedEvent>) {
        setIsFocused(true);
        onFocus?.(event);
    }

    function handleBur(event: NativeSyntheticEvent<TargetedEvent>) {
        setIsFocused(false);
        onBlur?.(event);
    }

    return (
        <InputComponent
            style={[
                inputStyles({
                    status: error ? 'error' : isFocused ? 'focus' : 'default',
                    disabled: disabled ? 'true' : 'false',
                }),
                style,
            ]}
            placeholderTextColor={theme.colors.gray[700]}
            onFocus={handleFocus}
            onBlur={handleBur}
            readOnly={disabled}
            {...props}
        />
    );
}

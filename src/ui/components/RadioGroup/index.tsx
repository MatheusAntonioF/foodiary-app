import { type ReactNode, createContext, use, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { AppText } from '../AppText';
import { theme } from '@ui/styles/theme';

interface IRadioGroupContextValue {
    value: string | null;
    setValue: (value: string | null) => void;
    isHorizontal: boolean;
}

const RadioGroupContext = createContext({} as IRadioGroupContextValue);

interface IRadioGroupProps {
    children: ReactNode;
    initialValue?: string | null;
    orientation?: 'vertical' | 'horizontal';
}

export function RadioGroup({
    children,
    initialValue,
    orientation = 'vertical',
}: IRadioGroupProps) {
    const [value, setValue] = useState<string | null>(initialValue ?? null);

    const isHorizontal = orientation === 'horizontal';

    return (
        <RadioGroupContext.Provider value={{ value, setValue, isHorizontal }}>
            <View
                style={[
                    styles.container,
                    isHorizontal && styles.containerHorizontal,
                ]}
            >
                {children}
            </View>
        </RadioGroupContext.Provider>
    );
}

interface IRadioGroupItemProps {
    children: ReactNode;
    value: string;
}

const RadioGroupItemContext = createContext({ isSelected: false });

export function RadioGroupItem({ value, children }: IRadioGroupItemProps) {
    const {
        value: selectedValue,
        setValue,
        isHorizontal,
    } = use(RadioGroupContext);
    const isSelected = selectedValue === value;

    return (
        <RadioGroupItemContext.Provider value={{ isSelected }}>
            <TouchableOpacity
                style={[
                    styles.item,
                    isHorizontal && styles.itemHorizontal,
                    isSelected && styles.selectedItem,
                ]}
                onPress={() => setValue(value)}
            >
                {children}
            </TouchableOpacity>
        </RadioGroupItemContext.Provider>
    );
}

export function RadioGroupIcon({ children }: { children: string }) {
    const { isSelected } = use(RadioGroupItemContext);
    return (
        <View style={[styles.icon, isSelected && styles.selectedIcon]}>
            <AppText>{children}</AppText>
        </View>
    );
}

export function RadioGroupLabel({ children }: { children: string }) {
    const { isHorizontal } = use(RadioGroupContext);
    return (
        <AppText
            weight="semiBold"
            style={[styles.label, isHorizontal && styles.textCenter]}
        >
            {children}
        </AppText>
    );
}

export function RadioGroupDescription({ children }: { children: string }) {
    const { isHorizontal } = use(RadioGroupContext);

    return (
        <AppText
            size="sm"
            color={theme.colors.gray[700]}
            style={[isHorizontal && styles.textCenter]}
        >
            {children}
        </AppText>
    );
}

export function RadioGroupItemInfo({ children }: { children: ReactNode }) {
    return <View style={styles.itemInfo}>{children}</View>;
}

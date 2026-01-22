import { Platform, Pressable, View } from 'react-native';
import { CameraIcon, MicIcon, type LucideIcon } from 'lucide-react-native';

import { theme } from '@ui/styles/theme';

import { AppText } from '../AppText';
import { styles } from './styles';

interface ICreateMealOptionsProps {
    disabled?: boolean;
}

export function CreateMealOptions({
    disabled = false,
}: ICreateMealOptionsProps) {
    return (
        <View style={styles.container}>
            <OptionButton icon={MicIcon} label="Áudio" disabled={disabled} />
            <OptionButton icon={CameraIcon} label="Foto" disabled={disabled} />
        </View>
    );
}

interface IOptionButtonProps {
    icon: LucideIcon;
    label: string;
    disabled?: boolean;
}

function OptionButton({ icon: Icon, label, disabled }: IOptionButtonProps) {
    return (
        <View style={styles.buttonWrapper}>
            <Pressable
                disabled={disabled}
                android_ripple={{
                    color: 'rgba(0, 0, 0, 0.1)',
                    foreground: true,
                }}
                style={({ pressed }) => [
                    styles.button,
                    (disabled || (pressed && Platform.OS === 'ios')) && {
                        opacity: 0.5,
                    },
                ]}
            >
                <View style={styles.icon}>
                    <Icon color={theme.colors.black['700']} size={24} />
                </View>
                <AppText weight="semiBold" style={styles.buttonLabel}>
                    {label}
                </AppText>
            </Pressable>
        </View>
    );
}

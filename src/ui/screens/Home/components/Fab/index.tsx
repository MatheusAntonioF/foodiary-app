import { useRef } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PlusIcon } from 'lucide-react-native';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetView,
} from '@gorhom/bottom-sheet';

import { Button } from '@ui/components/Button';
import { theme } from '@ui/styles/theme';

import { styles } from './styles';
import { AppText } from '@ui/components/AppText';
import { CreateMealOptions } from '@ui/components/CreateMealOptions';

export function Fab() {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const { bottom } = useSafeAreaInsets();

    function HandleOpenBottomSheet() {
        bottomSheetModalRef.current?.present();
    }

    return (
        <>
            <View style={[styles.container, { bottom: bottom }]}>
                <Button size="icon" onPress={HandleOpenBottomSheet}>
                    <PlusIcon size={20} color={theme.colors.black['700']} />
                </Button>
            </View>
            <BottomSheetModalProvider>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    style={styles.bottomSheet}
                >
                    <BottomSheetView
                        style={[styles.content, { paddingBottom: bottom + 20 }]}
                    >
                        <AppText
                            style={styles.title}
                            size="lg"
                            weight="semiBold"
                        >
                            Cadastre sua refeição
                        </AppText>

                        <CreateMealOptions />
                    </BottomSheetView>
                </BottomSheetModal>
            </BottomSheetModalProvider>
        </>
    );
}

/* eslint-disable comma-dangle */
import { useImperativeHandle, useRef } from 'react';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { ISignInBottomSheet } from './ISignInBottomSheet';
import type { TextInput } from 'react-native';

export function useSignInBottomSheetController(
    ref: React.Ref<ISignInBottomSheet>
) {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const { bottom } = useSafeAreaInsets();
    const passwordInputRef = useRef<TextInput>(null);

    useImperativeHandle(
        ref,
        () => ({
            open: () => {
                bottomSheetModalRef.current?.present();
            },
        }),
        []
    );

    function handleSubmit() {}

    return {
        bottom,
        bottomSheetModalRef,
        passwordInputRef,
        handleSubmit,
    };
}

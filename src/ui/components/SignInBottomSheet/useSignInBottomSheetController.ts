import { Alert, type TextInput } from 'react-native';
import { useImperativeHandle, useRef } from 'react';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type { ISignInBottomSheet } from './ISignInBottomSheet';
import { signInSchema } from './schema';
import { isAxiosError } from 'axios';
import { useAuth } from '@app/contexts/AuthContext/useAuth';

export function useSignInBottomSheetController(
    ref: React.Ref<ISignInBottomSheet>
) {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const { bottom } = useSafeAreaInsets();
    const passwordInputRef = useRef<TextInput>(null);
    const { signIn } = useAuth();

    const form = useForm({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: 'mat@gmail.com',
            password: '123123123',
        },
    });

    useImperativeHandle(
        ref,
        () => ({
            open: () => {
                bottomSheetModalRef.current?.present();
            },
        }),
        []
    );

    const handleSubmit = form.handleSubmit(async (data) => {
        try {
            await signIn(data);
        } catch (error) {
            if (isAxiosError(error)) {
                Alert.alert('Oops!', 'As credenciais informadas são inválidas');
            }
        }
    });

    return {
        bottom,
        bottomSheetModalRef,
        passwordInputRef,
        handleSubmit,
        form,
    };
}

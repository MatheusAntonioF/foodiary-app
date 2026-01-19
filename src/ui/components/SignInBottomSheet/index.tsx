import {
    BottomSheetModalProvider,
    BottomSheetModal,
    BottomSheetView,
    BottomSheetTextInput,
} from '@gorhom/bottom-sheet';

import { AppText } from '../AppText';
import { useSignInBottomSheetController } from './useSignInBottomSheetController';
import type { ISignInBottomSheet } from './ISignInBottomSheet';
import { Input } from '../Input';
import { styles } from './styles';
import { FormGroup } from '../FormGroup';
import { View } from 'react-native';
import { Button } from '../Button';
import { Controller } from 'react-hook-form';

interface ISignInBottomSheetProps {
    ref: React.Ref<ISignInBottomSheet>;
}

export function SignInBottomSheet({ ref }: ISignInBottomSheetProps) {
    const {
        bottom,
        bottomSheetModalRef,
        passwordInputRef,
        handleSubmit,
        form,
    } = useSignInBottomSheetController(ref);

    return (
        <BottomSheetModalProvider>
            <BottomSheetModal ref={bottomSheetModalRef}>
                <BottomSheetView
                    style={[styles.container, { paddingBottom: bottom }]}
                >
                    <AppText
                        size="3xl"
                        weight="semiBold"
                        style={styles.heading}
                    >
                        Acesse a sua conta
                    </AppText>

                    <View style={styles.form}>
                        <Controller
                            control={form.control}
                            name="email"
                            render={({ field, fieldState }) => (
                                <FormGroup
                                    label="Email"
                                    error={fieldState.error?.message}
                                >
                                    <Input
                                        InputComponent={BottomSheetTextInput}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        autoComplete="email"
                                        returnKeyType="next"
                                        onSubmitEditing={() => {
                                            passwordInputRef.current?.focus();
                                        }}
                                        value={field.value}
                                        onChangeText={field.onChange}
                                        disabled={form.formState.isSubmitting}
                                    />
                                </FormGroup>
                            )}
                        />
                        <Controller
                            control={form.control}
                            name="password"
                            render={({ field, fieldState }) => (
                                <FormGroup
                                    label="Senha"
                                    error={fieldState.error?.message}
                                >
                                    <Input
                                        ref={passwordInputRef}
                                        InputComponent={BottomSheetTextInput}
                                        secureTextEntry
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        autoComplete="current-password"
                                        returnKeyType="done"
                                        value={field.value}
                                        onChangeText={field.onChange}
                                        onSubmitEditing={handleSubmit}
                                        disabled={form.formState.isSubmitting}
                                    />
                                </FormGroup>
                            )}
                        />

                        <Button
                            onPress={handleSubmit}
                            isLoading={form.formState.isSubmitting}
                        >
                            Entrar
                        </Button>
                    </View>
                </BottomSheetView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}

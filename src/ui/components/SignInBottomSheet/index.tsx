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

interface ISignInBottomSheetProps {
    ref: React.Ref<ISignInBottomSheet>;
}

export function SignInBottomSheet({ ref }: ISignInBottomSheetProps) {
    const { bottom, bottomSheetModalRef, passwordInputRef, handleSubmit } =
        useSignInBottomSheetController(ref);

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
                        <FormGroup label="Email">
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
                            />
                        </FormGroup>
                        <FormGroup label="Senha">
                            <Input
                                ref={passwordInputRef}
                                InputComponent={BottomSheetTextInput}
                                secureTextEntry
                                autoCapitalize="none"
                                autoCorrect={false}
                                autoComplete="current-password"
                                returnKeyType="done"
                                onSubmitEditing={handleSubmit}
                            />
                        </FormGroup>

                        <Button onPress={handleSubmit}>Entrar</Button>
                    </View>
                </BottomSheetView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}

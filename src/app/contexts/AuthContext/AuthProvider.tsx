import { useCallback, useLayoutEffect, useState, type ReactNode } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { AuthService } from '@app/services/AuthService';
import { AuthTokensManager } from '@app/lib/AuthTokensManager';
import { useAccount } from '@app/hooks/queries/useAccount';
import { Service } from '@app/services/Service';

import { AuthContext } from '.';
import { useQueryClient } from '@tanstack/react-query';
import { useForRender } from '@app/hooks/app/useForceRender';
SplashScreen.preventAutoHideAsync();

interface ISetupAuthParams {
    accessToken: string;
    refreshToken: string;
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isReady, setIsReady] = useState(false);
    const [signedUp, setSignedUp] = useState(false);

    const { account, loadAccount } = useAccount({ enabled: false });
    const queryClient = useQueryClient();
    const forceRender = useForRender();

    const signOut = useCallback(async () => {
        Service.removeAccessToken();
        Service.removeRefreshTokenHandler();

        queryClient.clear();
        forceRender();

        await AuthTokensManager.clear();
    }, [queryClient]);

    const setupAuth = useCallback(
        async (tokens: ISetupAuthParams) => {
            Service.setAccessToken(tokens.accessToken);
            Service.setRefreshTokenHandler(async () => {
                try {
                    const storedTokens = await AuthTokensManager.load();
                    if (!storedTokens) {
                        throw new Error('Tokens not found');
                    }
                    const newTokens = await AuthService.refresh({
                        refreshToken: storedTokens.refreshToken,
                    });

                    Service.setAccessToken(newTokens.accessToken);
                    await AuthTokensManager.save(newTokens);
                } catch (error) {
                    signOut();
                    throw error;
                }
            });
            await loadAccount();

            SplashScreen.hideAsync();
            setIsReady(true);
        },
        [signOut]
    );

    useLayoutEffect(() => {
        async function load() {
            const tokens = await AuthTokensManager.load();
            if (!tokens) {
                setIsReady(true);
                SplashScreen.hideAsync();
                return;
            }

            await setupAuth(tokens);
        }
        load();
    }, [loadAccount, setupAuth]);

    const signIn = useCallback(async (payload: AuthService.SignInPayload) => {
        const tokens = await AuthService.signIn(payload);
        await setupAuth(tokens);
        await AuthTokensManager.save(tokens);
    }, []);

    const signUp = useCallback(async (payload: AuthService.SignUpPayload) => {
        const tokens = await AuthService.signUp(payload);

        setSignedUp(true);
        await setupAuth(tokens);
        await AuthTokensManager.save(tokens);
    }, []);

    if (!isReady) {
        return null;
    }

    return (
        <AuthContext.Provider
            value={{ signedIn: !!account, signIn, signUp, signOut, signedUp }}
        >
            {children}
        </AuthContext.Provider>
    );
}

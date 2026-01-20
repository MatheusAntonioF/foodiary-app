import { StatusBar } from 'expo-status-bar';
import {
    HostGrotesk_400Regular,
    HostGrotesk_500Medium,
    HostGrotesk_600SemiBold,
    useFonts,
} from '@expo-google-fonts/host-grotesk';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Navigation } from '@app/navigation';
import { AuthProvider } from '@app/contexts/AuthContext/AuthProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@app/lib/queryClient';

export function App() {
    const [isFontsLoaded] = useFonts({
        HostGrotesk_400Regular,
        HostGrotesk_500Medium,
        HostGrotesk_600SemiBold,
    });

    if (!isFontsLoaded) {
        return null;
    }

    return (
        <GestureHandlerRootView>
            <SafeAreaProvider>
                <QueryClientProvider client={queryClient}>
                    <AuthProvider>
                        <Navigation />
                    </AuthProvider>
                </QueryClientProvider>
                <StatusBar />
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}

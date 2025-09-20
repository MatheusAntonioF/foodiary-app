import {
    HostGrotesk_400Regular,
    HostGrotesk_500Medium,
    HostGrotesk_600SemiBold,
    useFonts,
} from '@expo-google-fonts/host-grotesk';

import { Greetings } from './screens/Greetings';

export function App() {
    const [isFontsLoaded] = useFonts({
        HostGrotesk_400Regular,
        HostGrotesk_500Medium,
        HostGrotesk_600SemiBold,
    });

    if (!isFontsLoaded) {
        return null;
    }

    return <Greetings />;
}

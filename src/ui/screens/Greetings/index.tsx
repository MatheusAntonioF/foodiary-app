import { ImageBackground } from 'react-native';

import { AppText } from '@ui/components/AppText';
import greetingsBg from '@ui/assets/greetings-bg/image.jpg';

import { styles } from './styles';

export function Greetings() {
    return (
        <ImageBackground
            style={styles.container}
            source={greetingsBg}
            resizeMode="cover"
        >
            <AppText>hello</AppText>
        </ImageBackground>
    );
}

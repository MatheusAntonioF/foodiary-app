import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import { Alert } from 'react-native';
import {
    AudioModule,
    RecordingPresets,
    setAudioModeAsync,
    useAudioRecorder,
} from 'expo-audio';
import { useNavigation } from '@react-navigation/native';
import type { AppStackNavigationProps } from '@app/navigation/AppStack';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateMeal } from '@app/hooks/mutations/useCreateMeal';
import { useMeal } from '@app/hooks/queries/useMeal';
import { MealStatus } from '@app/types/Meal';

export type AudioModalState = 'idle' | 'recording' | 'recorded';

interface IUseAudioModalControllerParams {
    onClose: () => void;
}

export function useAudioModalController({
    onClose,
}: IUseAudioModalControllerParams) {
    const [state, setState] = useState<AudioModalState>('idle');
    const [audioUri, setAudioUri] = useState<string | null>(null);
    const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

    const { navigate } = useNavigation<AppStackNavigationProps>();
    const queryClient = useQueryClient();

    const memoizedOnClose = useRef(onClose);
    useLayoutEffect(() => {
        memoizedOnClose.current = onClose;
    }, [onClose]);

    const {
        createMeal,
        isLoading: isCreatingMeal,
        createdMealId,
    } = useCreateMeal();
    const {
        meal,
        isLoading: isLoadingMeal,
        isProcessing: isProcessingMeal,
    } = useMeal(createdMealId);

    useEffect(() => {
        if (meal?.status === MealStatus.FAILED) {
            Alert.alert(
                'Oops!',
                'Ocorreu um erro ao criar sua refeição! Tente novamente'
            );
        }

        if (meal?.status === MealStatus.SUCCESS) {
            memoizedOnClose.current();
            queryClient.invalidateQueries({ queryKey: ['meals'] });
            navigate('MealDetails', { mealId: meal.id });
        }
    }, [meal?.status, meal?.id, navigate, queryClient]);

    useEffect(() => {
        async function load() {
            const status = await AudioModule.requestRecordingPermissionsAsync();

            if (!status.granted) {
                Alert.alert('Permissão para acessar o microfone negada');
            }

            setAudioModeAsync({
                playsInSilentMode: true,
                allowsRecording: true,
            });
        }

        load();
    }, []);

    async function handleStartRecording() {
        await audioRecorder.prepareToRecordAsync();
        audioRecorder.record();

        setState('recording');
    }

    const handleStopRecording = useCallback(async () => {
        await audioRecorder.stop();
        setAudioUri(audioRecorder.uri);
        setState('recorded');
    }, []);

    function handleTryAgain() {
        setState('idle');
    }

    async function handleConfirm() {
        if (!audioUri) return;

        try {
            await createMeal(audioUri);
        } catch (error) {
            console.error(error);
            Alert.alert(
                'Oops!',
                'Ocorreu um erro ao criar sua refeição! Tente novamente.'
            );
        }
    }

    return {
        state,
        audioUri,
        isLoading: isCreatingMeal || isLoadingMeal || isProcessingMeal,
        handleStartRecording,
        handleStopRecording,
        handleTryAgain,
        handleConfirm,
    };
}

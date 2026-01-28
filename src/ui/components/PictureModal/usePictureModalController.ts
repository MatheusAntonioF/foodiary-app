import { Alert } from 'react-native';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useCameraPermissions, type CameraView } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';

import { MealStatus } from '@app/types/Meal';
import { useMeal } from '@app/hooks/queries/useMeal';
import { useCreateMeal } from '@app/hooks/mutations/useCreateMeal';
import type { AppStackNavigationProps } from '@app/navigation/AppStack';

interface IUsePictureModalControllerParams {
    onClose: () => void;
}

export function usePictureModalController({
    onClose,
}: IUsePictureModalControllerParams) {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);
    const [photoUri, setPhotoUri] = useState<null | string>(null);
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

    async function handleTakePicture() {
        if (!cameraRef.current) return;

        const picture = await cameraRef.current.takePictureAsync({
            imageType: 'jpg',
        });

        setPhotoUri(picture.uri);
    }

    function handleTryAgain() {
        setPhotoUri(null);
    }

    async function handleConfirm() {
        if (!photoUri) return;

        try {
            await createMeal(photoUri);
        } catch (error) {
            console.error(error);
            Alert.alert(
                'Oops!',
                'Ocorreu um erro ao criar sua refeição! Tente novamente.'
            );
        }
    }

    return {
        isLoading: isCreatingMeal || isLoadingMeal || isProcessingMeal,
        permission,
        cameraRef,
        photoUri,
        requestPermission,
        handleTryAgain,
        handleConfirm,
        handleTakePicture,
    };
}

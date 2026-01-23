import { useRef, useState } from 'react';
import { useCameraPermissions, type CameraView } from 'expo-camera';

export function usePictureModalController() {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);
    const [photoUri, setPhotoUri] = useState<null | string>(null);

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

    function handleConfirm() {}

    return {
        isLoading: false,
        permission,
        cameraRef,
        photoUri,
        requestPermission,
        handleTryAgain,
        handleConfirm,
        handleTakePicture,
    };
}

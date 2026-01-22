import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useMeals } from '@app/hooks/queries/useMeals';

export function useHomeController() {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { top, bottom } = useSafeAreaInsets();
    const [date, setDate] = useState(new Date());

    const { meals, isInitialLoading, isLoading, reloadMeals } = useMeals(date);

    async function handleRefresh() {
        setIsRefreshing(true);
        await reloadMeals();
        setIsRefreshing(false);
    }

    function handleNextDay() {
        setDate((prevState) => {
            const newDate = new Date(prevState);
            newDate.setDate(prevState.getDate() + 1);

            return newDate;
        });
    }

    function handlePreviousDay() {
        setDate((prevState) => {
            const newDate = new Date(prevState);
            newDate.setDate(prevState.getDate() - 1);

            return newDate;
        });
    }

    return {
        isRefreshing,
        top,
        bottom,
        date,
        isInitialLoading,
        meals,
        isLoading,
        handleRefresh,
        handleNextDay,
        handlePreviousDay,
    };
}

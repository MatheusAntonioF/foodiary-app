import { useQuery } from '@tanstack/react-query';

import { MealsService } from '@app/services/MealsService';
import { MealStatus } from '@app/types/Meal';

const processingStatuses = [
    MealStatus.UPLOADING,
    MealStatus.QUEUED,
    MealStatus.PROCESSING,
];

export function useMeal(mealId?: string) {
    const { data: meal, isFetching } = useQuery({
        queryKey: ['meal', mealId],
        enabled: !!mealId,
        staleTime: Infinity,
        queryFn: async () => {
            if (!mealId) return;

            const { meal } = await MealsService.getMealById(mealId);

            return meal;
        },
        refetchInterval: (query) => {
            const mealStatus = query.state.data?.status;
            if (mealStatus && processingStatuses.includes(mealStatus)) {
                return 3_000; // 3s
            }

            return false;
        },
    });

    const isProcessing = !!(meal && processingStatuses.includes(meal.status));

    return {
        meal,
        isLoading: isFetching,
        isProcessing,
    };
}

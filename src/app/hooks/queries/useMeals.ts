import { MealsService } from '@app/services/MealsService';
import { useQuery } from '@tanstack/react-query';

export function useMeals(date: Date) {
    const formattedDate = date.toISOString().split('T')[0];

    const { data, isLoading, isFetching, refetch } = useQuery({
        staleTime: Infinity,
        queryKey: ['meals', formattedDate],
        /**
         * replace the data when the request is executing
         * it receives the previousData = data from the cache before receiving
         * the response from the request
         *
         * keepPreviousData - internal function from react-query that makes exactly the same
         * we're doing now
         */
        placeholderData: (previousData) => previousData,
        queryFn: async () => {
            const { meals } = await MealsService.getMealsByDate(formattedDate);
            return meals;
        },
    });

    return {
        meals: data ?? [],
        // isLoading is true only in the first request
        // or when the cache is missing for the query key
        isInitialLoading: isLoading,
        isLoading: isFetching,
        reloadMeals: refetch,
    };
}

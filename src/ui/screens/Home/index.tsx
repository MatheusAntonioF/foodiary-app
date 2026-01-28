import { FlatList, RefreshControl, View } from 'react-native';

import { theme } from '@ui/styles/theme';
import { WelcomeModal } from '@ui/components/WelcomeModal';

import { styles } from './styles';
import { Header } from './components/Header';
import { MealCard } from './components/MealCard';
import { EmptyState } from './components/EmptyState';
import { FullScreenLoader } from './components/FullScreenLoader';
import { ItemSeparatorComponent } from './components/ItemSeparatorComponent';
import { useHomeController } from './useHomeController';
import { HomeProvider } from './context/HomeProvider';
import { Fab } from './components/Fab';

export function Home() {
    const {
        bottom,
        date,
        isRefreshing,
        meals,
        top,
        isInitialLoading,
        isLoading,
        handleNextDay,
        handlePreviousDay,
        handleRefresh,
    } = useHomeController();

    if (isInitialLoading) {
        return <FullScreenLoader />;
    }

    return (
        <View style={[styles.container, { paddingTop: top }]}>
            <WelcomeModal />

            <HomeProvider
                date={date}
                meals={meals}
                nextDay={handleNextDay}
                previousDay={handlePreviousDay}
                isLoading={isLoading}
            >
                <FlatList
                    data={meals}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={[
                        styles.content,
                        { paddingBottom: bottom + 24 },
                    ]}
                    ListHeaderComponent={Header}
                    ListEmptyComponent={EmptyState}
                    ItemSeparatorComponent={ItemSeparatorComponent}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={handleRefresh}
                            tintColor={theme.colors.lime[900]}
                            colors={[theme.colors.lime[700]]}
                        />
                    }
                    renderItem={({ item: meal }) => <MealCard meal={meal} />}
                />
            </HomeProvider>
            {meals.length > 0 && <Fab />}
        </View>
    );
}

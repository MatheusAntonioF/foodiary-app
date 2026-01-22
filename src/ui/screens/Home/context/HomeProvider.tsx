import type { ReactElement } from 'react';
import { HomeContext, type IHomeContextValue } from '.';

interface IHomeProviderProps extends IHomeContextValue {
    children: ReactElement;
}

export function HomeProvider({ children, ...ctxValue }: IHomeProviderProps) {
    return (
        <HomeContext.Provider value={ctxValue}>{children}</HomeContext.Provider>
    );
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useReducer } from 'react';

export function useForRender() {
    const [_, dispatch] = useReducer((a) => a + 1, 0);

    return dispatch;
}

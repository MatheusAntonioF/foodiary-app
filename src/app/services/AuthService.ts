import type { Goal } from '@app/types/Goal';
import type { Gender } from '@app/types/Gender';
import type { ActivityLevel } from '@app/types/ActivityLevel';

import { Service } from './Service';

export class AuthService extends Service {
    static async signIn({
        email,
        password,
    }: AuthService.SignInPayload): Promise<AuthService.SignInResponse> {
        const { data } = await this.client.post<AuthService.SignInResponse>(
            '/auth/sign-in',
            {
                email,
                password,
            }
        );

        return data;
    }

    static async signUp(
        payload: AuthService.SignUpPayload
    ): Promise<AuthService.SignUpResponse> {
        const { data } = await this.client.post<AuthService.SignUpResponse>(
            '/auth/sign-up',
            payload
        );

        return {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
        };
    }

    static async refresh(
        payload: AuthService.RefreshPayload
    ): Promise<AuthService.RefreshResponse> {
        const { data } = await this.client.post<AuthService.RefreshResponse>(
            '/auth/refresh-token',
            payload
        );

        return data;
    }
}

export namespace AuthService {
    export type SignInPayload = {
        email: string;
        password: string;
    };

    export type SignInResponse = {
        accessToken: string;
        refreshToken: string;
    };

    export type SignUpPayload = {
        account: {
            email: string;
            password: string;
        };
        profile: {
            name: string;
            birthDate: string;
            gender: Gender;
            goal: Goal;
            height: number;
            weight: number;
            activityLevel: ActivityLevel;
        };
    };

    export type SignUpResponse = {
        accessToken: string;
        refreshToken: string;
    };

    export type RefreshPayload = {
        refreshToken: string;
    };

    export type RefreshResponse = {
        accessToken: string;
        refreshToken: string;
    };
}

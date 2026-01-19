import { ArrowRightIcon } from 'lucide-react-native';
import DateTimePicker, {
    type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

import { Button } from '@ui/components/Button';
import { theme } from '@ui/styles/theme';

import { useOnboarding } from '../context/useOnboarding';
import {
    Step,
    StepContent,
    StepFooter,
    StepHeader,
    StepSubTitle,
    StepTitle,
} from '../components/Step';
import { useState } from 'react';
import { Platform } from 'react-native';
import { AppText } from '@ui/components/AppText';
import { TouchableWithoutFeedback } from '@gorhom/bottom-sheet';
import { Controller, useFormContext } from 'react-hook-form';
import type { OnboardingSchema } from '../schema';

export function BirthDateStep() {
    const { nextStep } = useOnboarding();
    const form = useFormContext<OnboardingSchema>();

    const [isDatePickerVisible, setIsDatePickerVisible] = useState(true);

    function handleSelectDate(_event: DateTimePickerEvent, newDate?: Date) {
        if (!newDate) {
            return;
        }

        form.setValue('birthDate', newDate);

        if (Platform.OS === 'android') {
            setIsDatePickerVisible(false);
        }
    }

    async function handleNextStep() {
        const isValid = await form.trigger('birthDate');

        if (isValid) {
            nextStep();
        }
    }

    return (
        <Step>
            <StepHeader>
                <StepTitle>Que dia você nasceu?</StepTitle>
                <StepSubTitle>
                    Cada faixa etária responde de forma única
                </StepSubTitle>
            </StepHeader>
            <StepContent position="center">
                <Controller
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                        <>
                            {isDatePickerVisible && (
                                <DateTimePicker
                                    mode="date"
                                    value={field.value}
                                    display="spinner"
                                    onChange={handleSelectDate}
                                />
                            )}

                            {Platform.OS === 'android' && (
                                <TouchableWithoutFeedback
                                    onPress={() => setIsDatePickerVisible(true)}
                                >
                                    <AppText
                                        size="3xl"
                                        weight="semiBold"
                                        color={theme.colors.gray[700]}
                                    >
                                        {formatDate(field.value)}
                                    </AppText>
                                </TouchableWithoutFeedback>
                            )}
                        </>
                    )}
                />
            </StepContent>
            <StepFooter>
                <Button size="icon" onPress={handleNextStep}>
                    <ArrowRightIcon size={20} color={theme.colors.black[700]} />
                </Button>
            </StepFooter>
        </Step>
    );
}

function formatDate(date: Date) {
    return new Intl.DateTimeFormat('pt-BR').format(date);
}

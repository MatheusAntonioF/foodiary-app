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

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
}

export function BirthDateStep() {
    const { nextStep } = useOnboarding();
    const [date, setDate] = useState(new Date());
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(true);

    function handleSelectDate(_event: DateTimePickerEvent, newDate?: Date) {
        if (!newDate) {
            return;
        }

        setDate(newDate);

        if (Platform.OS === 'android') {
            setIsDatePickerVisible(false);
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
                {isDatePickerVisible && (
                    <DateTimePicker
                        mode="date"
                        value={date}
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
                            {formatDate(date)}
                        </AppText>
                    </TouchableWithoutFeedback>
                )}
            </StepContent>
            <StepFooter>
                <Button size="icon" onPress={nextStep}>
                    <ArrowRightIcon size={20} color={theme.colors.black[700]} />
                </Button>
            </StepFooter>
        </Step>
    );
}

function formatDate(date: Date) {
    return new Intl.DateTimeFormat('pt-BR').format(date);
}

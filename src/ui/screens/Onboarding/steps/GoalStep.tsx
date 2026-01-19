import { useOnboarding } from '../context/useOnboarding';
import { Button } from '@ui/components/Button';
import {
    Step,
    StepContent,
    StepFooter,
    StepHeader,
    StepSubTitle,
    StepTitle,
} from '../components/Step';
import { ArrowRightIcon } from 'lucide-react-native';
import { theme } from '@ui/styles/theme';
import {
    RadioGroup,
    RadioGroupIcon,
    RadioGroupItem,
    RadioGroupLabel,
} from '@ui/components/RadioGroup';
import { Goal } from '@app/types/Goal';
import { Controller, useFormContext } from 'react-hook-form';
import type { OnboardingSchema } from '../schema';

export function GoalStep() {
    const { nextStep } = useOnboarding();
    const form = useFormContext<OnboardingSchema>();

    async function handleNextStep() {
        const isValid = await form.trigger('goal');

        if (isValid) {
            nextStep();
        }
    }

    return (
        <Step>
            <StepHeader>
                <StepTitle>Qual é seu objetivo?</StepTitle>
                <StepSubTitle>
                    O que você pretende alcançar com a dieta?
                </StepSubTitle>
            </StepHeader>
            <StepContent>
                <Controller
                    control={form.control}
                    name="goal"
                    render={({ field, fieldState }) => (
                        <RadioGroup
                            value={field.value}
                            onChangeValue={(value) => {
                                field.onChange(value);
                                form.trigger('goal');
                            }}
                            error={!!fieldState.error}
                        >
                            <RadioGroupItem value={Goal.LOSE}>
                                <RadioGroupIcon>🥦</RadioGroupIcon>
                                <RadioGroupLabel>Perder peso</RadioGroupLabel>
                            </RadioGroupItem>
                            <RadioGroupItem value={Goal.MAINTAIN}>
                                <RadioGroupIcon>🍍</RadioGroupIcon>
                                <RadioGroupLabel>Manter o peso</RadioGroupLabel>
                            </RadioGroupItem>
                            <RadioGroupItem value={Goal.GAIN}>
                                <RadioGroupIcon>🥩</RadioGroupIcon>
                                <RadioGroupLabel>Ganhar peso</RadioGroupLabel>
                            </RadioGroupItem>
                        </RadioGroup>
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

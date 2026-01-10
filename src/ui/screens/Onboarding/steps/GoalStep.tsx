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
import React from 'react';

export enum Goal {
    LOSE = 'LOSE',
    MAINTAIN = 'MAINTAIN',
    GAIN = 'GAIN',
}

export function GoalStep() {
    const { nextStep } = useOnboarding();

    return (
        <Step>
            <StepHeader>
                <StepTitle>Qual é seu objetivo?</StepTitle>
                <StepSubTitle>
                    O que você pretende alcançar com a dieta?
                </StepSubTitle>
            </StepHeader>
            <StepContent>
                <RadioGroup>
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
            </StepContent>
            <StepFooter>
                <Button size="icon" onPress={nextStep}>
                    <ArrowRightIcon size={20} color={theme.colors.black[700]} />
                </Button>
            </StepFooter>
        </Step>
    );
}

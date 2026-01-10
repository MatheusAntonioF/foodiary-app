import { ArrowRightIcon } from 'lucide-react-native';

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
import { FormGroup } from '@ui/components/FormGroup';
import { Input } from '@ui/components/Input';
import { formatDecimal } from '@ui/utils/formatDecimal';

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
}

export function WeightStep() {
    const { nextStep } = useOnboarding();

    return (
        <Step>
            <StepHeader>
                <StepTitle>Qual é seu peso?</StepTitle>
                <StepSubTitle>Você pode inserir uma estimativa</StepSubTitle>
            </StepHeader>
            <StepContent position="center">
                <FormGroup label="Peso" style={{ width: '100%' }}>
                    <Input
                        autoFocus
                        placeholder="80"
                        keyboardType="numeric"
                        formatter={formatDecimal}
                    />
                </FormGroup>
            </StepContent>
            <StepFooter>
                <Button size="icon" onPress={nextStep}>
                    <ArrowRightIcon size={20} color={theme.colors.black[700]} />
                </Button>
            </StepFooter>
        </Step>
    );
}

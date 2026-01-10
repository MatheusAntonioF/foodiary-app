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

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
}

export function GenderStep() {
    const { nextStep } = useOnboarding();

    return (
        <Step>
            <StepHeader>
                <StepTitle>Qual é seu gênero?</StepTitle>
                <StepSubTitle>
                    Seu gênero influencia seu tipo de dieta
                </StepSubTitle>
            </StepHeader>
            <StepContent>
                <RadioGroup orientation="horizontal">
                    <RadioGroupItem value={Gender.MALE}>
                        <RadioGroupIcon>👨‍🦱</RadioGroupIcon>
                        <RadioGroupLabel>Masculino</RadioGroupLabel>
                    </RadioGroupItem>
                    <RadioGroupItem value={Gender.FEMALE}>
                        <RadioGroupIcon>👱‍♀️</RadioGroupIcon>
                        <RadioGroupLabel>Manter o peso</RadioGroupLabel>
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

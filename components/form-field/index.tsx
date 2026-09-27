import { useThemeColors } from '@/hooks/use-theme-colors'
import { TextInput, type TextInputProps } from 'react-native'
import { Text } from '../ui/text'
import { VStack } from '../ui/vstack'

type Props = TextInputProps & {
    label: string
    error?: string
    isLast?: boolean
}

const FormField = ({ label, error, isLast = false, ...inputProps }: Props) => {
    const colors = useThemeColors()

    return (
        <VStack space="xs" className={`py-4 ${isLast ? '' : 'border-b border-border'}`}>
            <Text variant="caption" className={error ? 'text-destructive' : 'text-muted-foreground'}>
                {error ?? label}
            </Text>
            <TextInput
                placeholderTextColor={colors.mutedForeground}
                className="font-inter-medium text-[17px] text-foreground p-0"
                {...inputProps}
            />
        </VStack>
    )
}

export default FormField

import { formatDate } from '@/data/responsibilities'
import DateTimePicker from '@expo/ui/community/datetime-picker'
import { useState } from 'react'
import { Platform, Pressable } from 'react-native'
import { HStack } from '../ui/hstack'
import { Text } from '../ui/text'
import { VStack } from '../ui/vstack'

type Props = {
    label: string
    value: Date
    onChange: (date: Date) => void
    isLast?: boolean
}

// iOS shows the compact native picker inline; Android opens the native dialog on tap
const DateField = ({ label, value, onChange, isLast = false }: Props) => {
    const [dialogOpen, setDialogOpen] = useState(false)

    return (
        <HStack
            className={`items-center justify-between py-4 ${isLast ? '' : 'border-b border-border'}`}
        >
            <VStack space="xs" className="flex-1">
                <Text variant="caption" className="text-muted-foreground">
                    {label}
                </Text>
                {Platform.OS !== 'ios' && (
                    <Pressable onPress={() => setDialogOpen(true)} accessibilityRole="button">
                        <Text variant="body-medium" className="text-[17px]">
                            {formatDate(value)}
                        </Text>
                    </Pressable>
                )}
            </VStack>

            {Platform.OS === 'ios' && (
                <DateTimePicker
                    value={value}
                    mode="date"
                    display="compact"
                    onValueChange={(_, date) => onChange(date)}
                />
            )}
            {Platform.OS === 'android' && dialogOpen && (
                <DateTimePicker
                    value={value}
                    mode="date"
                    presentation="dialog"
                    onValueChange={(_, date) => {
                        setDialogOpen(false)
                        onChange(date)
                    }}
                    onDismiss={() => setDialogOpen(false)}
                />
            )}
        </HStack>
    )
}

export default DateField

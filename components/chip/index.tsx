import { Pressable } from 'react-native'
import { Text } from '../ui/text'

type Props = {
    label: string
    selected: boolean
    onPress: () => void
    accessibilityRole?: 'tab' | 'checkbox'
}

const Chip = ({ label, selected, onPress, accessibilityRole = 'tab' }: Props) => {
    return (
        <Pressable
            onPress={onPress}
            accessibilityRole={accessibilityRole}
            accessibilityState={
                accessibilityRole === 'checkbox' ? { checked: selected } : { selected }
            }
            className={
                selected
                    ? 'rounded-full border border-primary bg-primary px-4 py-2.5'
                    : 'rounded-full border border-border bg-card px-4 py-2.5'
            }
        >
            <Text
                variant="body-medium"
                className={selected ? 'text-primary-foreground' : 'text-muted-foreground'}
            >
                {label}
            </Text>
        </Pressable>
    )
}

export default Chip

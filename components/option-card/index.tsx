import { useThemeColors } from '@/hooks/use-theme-colors'
import type { LucideIcon } from 'lucide-react-native'
import { Pressable } from 'react-native'
import { Text } from '../ui/text'

type Props = {
    icon: LucideIcon
    label: string
    onPress: () => void
}

const OptionCard = ({ icon: Icon, label, onPress }: Props) => {
    const colors = useThemeColors()

    return (
        <Pressable
            onPress={onPress}
            accessibilityRole="button"
            className="flex-1 gap-4 rounded-2xl border border-border bg-card p-5 active:opacity-80"
        >
            <Icon color={colors.foreground} size={22} />
            <Text variant="body-medium" className="text-[17px]">
                {label}
            </Text>
        </Pressable>
    )
}

export default OptionCard

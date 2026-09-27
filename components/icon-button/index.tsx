import { useThemeColors } from '@/hooks/use-theme-colors'
import type { LucideIcon } from 'lucide-react-native'
import { Button } from '../ui/button'

type Props = {
    icon: LucideIcon
    onPress?: () => void
    accessibilityLabel: string
}

const IconButton = ({ icon: Icon, onPress, accessibilityLabel }: Props) => {
    const colors = useThemeColors()

    return (
        <Button
            variant="secondary"
            className="w-11 h-11 px-0 py-0 rounded-xl"
            onPress={onPress}
            accessibilityLabel={accessibilityLabel}
        >
            <Icon color={colors.foreground} size={18} />
        </Button>
    )
}

export default IconButton

import { useThemeColors } from '@/hooks/use-theme-colors'
import type { LucideIcon } from 'lucide-react-native'
import { Box } from '../ui/box'

const SIZES = {
    md: { box: 'w-11 h-11 rounded-xl', icon: 18 },
    lg: { box: 'w-16 h-16 rounded-2xl', icon: 24 },
}

type Props = {
    icon: LucideIcon
    size?: keyof typeof SIZES
}

const IconTile = ({ icon: Icon, size = 'md' }: Props) => {
    const colors = useThemeColors()

    return (
        <Box className={`${SIZES[size].box} items-center justify-center bg-secondary`}>
            <Icon color={colors.foreground} size={SIZES[size].icon} />
        </Box>
    )
}

export default IconTile
